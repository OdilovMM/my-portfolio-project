const Admin = require("../models/adminModel");
const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");
const formidable = require("formidable");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const Message = require("../models/chat/sellerCustomerMessageModel");
const { responseReturn } = require("../utils/response");

class chatController {
  addChatFriend = async (req, res) => {
    const { sellerId, userId } = req.body;

    try {
      if (sellerId !== "") {
        const seller = await Seller.findById(sellerId);
        const user = await Customer.findById(userId);
        const checkSeller = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: userId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: sellerId,
                },
              },
            },
          ],
        });
        if (!checkSeller) {
          await sellerCustomerModel.updateOne(
            {
              myId: userId,
            },
            {
              $push: {
                myFriends: {
                  fdId: sellerId,
                  name: seller.shopInfo?.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }

        const checkCustomer = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: userId,
                },
              },
            },
          ],
        });
        if (!checkCustomer) {
          await sellerCustomerModel.updateOne(
            {
              myId: sellerId,
            },
            {
              $push: {
                myFriends: {
                  fdId: userId,
                  name: user.name,
                  image: "",
                },
              },
            }
          );
        }

        const messages = await Message.find({
          $or: [
            {
              $and: [
                {
                  receiverId: { $eq: sellerId },
                },
                {
                  senderId: {
                    $eq: userId,
                  },
                },
              ],
            },
            {
              $and: [
                {
                  receiverId: { $eq: userId },
                },
                {
                  senderId: {
                    $eq: sellerId,
                  },
                },
              ],
            },
          ],
        });
        console.log("messages:", messages);
        const MyFriends = await sellerCustomerModel.findOne({
          myId: userId,
        });

        const currentFriend = MyFriends.myFriends.find(
          (s) => s.fdId === sellerId
        );

        responseReturn(res, 200, {
          MyFriends: MyFriends.myFriends,
          currentFriend,
          messages,
        });
      } else {
        const MyFriends = await sellerCustomerModel.findOne({
          myId: userId,
        });
        responseReturn(res, 200, {
          MyFriends: MyFriends.myFriends,
        });
      }
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };

  sendMessageToSeller = async (req, res) => {
    const { userId, message, sellerId, name } = req.body;

    try {
      const messageText = await Message.create({
        senderId: userId,
        senderName: name,
        receiverId: sellerId,
        message: message,
      });

      // for customer
      const data = await sellerCustomerModel.findOne({ myId: userId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((fri) => fri.fdId === sellerId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: userId,
        },
        {
          myFriends,
        }
      );

      // seller
      const data1 = await sellerCustomerModel.findOne({ myId: sellerId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((fri) => fri.fdId === userId);
      while (index > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends1[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: sellerId,
        },
        {
          myFriends1,
        }
      );

      responseReturn(res, 201, { messageText });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };

  getCustomers = async (req, res) => {
    const { sellerId } = req.params;

    try {
      //
      const data = await sellerCustomerModel.findOne({
        myId: sellerId,
      });
      responseReturn(res, 200, {
        customers: data.myFriends,
      });
    } catch (error) {
      //
    }
  };
}

module.exports = new chatController();
