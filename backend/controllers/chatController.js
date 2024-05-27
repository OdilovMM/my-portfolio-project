const Admin = require("../models/adminModel");
const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");
const formidable = require("formidable");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const adminMessage = require("../models/chat/adminSellerMessageSchema");
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
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
  getCustomerMessage = async (req, res) => {
    const { customerId } = req.params;
    const { id } = req;

    try {
      const messages = await Message.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: customerId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: customerId,
                },
              },
            ],
          },
        ],
      });
      const currentCustomer = await Customer.findById(customerId);
      responseReturn(res, 200, {
        messages,
        currentCustomer,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  sendMessageToCustomer = async (req, res) => {
    const { senderId, receiverId, name, messageText } = req.body;

    try {
      const sentMessage = await Message.create({
        senderId: senderId,
        senderName: name,
        receiverId: receiverId,
        message: messageText,
      });

      // seller to customer
      const data = await sellerCustomerModel.findOne({ myId: senderId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((fri) => fri.fdId === receiverId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: senderId,
        },
        {
          myFriends,
        }
      );

      // customer to seller
      const data1 = await sellerCustomerModel.findOne({ myId: receiverId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((fri) => fri.fdId === senderId);
      while (index > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends1[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: receiverId,
        },
        {
          myFriends1,
        }
      );

      responseReturn(res, 201, { sentMessage });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getSellersChatToAdmin = async (req, res) => {
    try {
      const sellers = await Seller.find({});
      responseReturn(res, 200, { sellers });
    } catch (error) {
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
  adminMessageToSeller = async (req, res) => {
    const { senderId, receiverId, message, senderName } = req.body;
    try {
      const adminMessages = await adminMessage.create({
        senderId,
        receiverId,
        message,
        senderName,
      });
      responseReturn(res, 201, { adminMessages });
    } catch (error) {
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };

  getAdminMessages = async (req, res) => {
    const { receiverId } = req.params;
    const id = "";

    try {
      const messages = await adminMessage.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: receiverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receiverId,
                },
              },
            ],
          },
        ],
      });
      let currentSeller = {};
      if (receiverId) {
        currentSeller = await Seller.findById(receiverId);
      }

      responseReturn(res, 200, {
        messages,
        currentSeller,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  getSellerMessages = async (req, res) => {
    const receiverId = "";
    const { id } = req;

    try {
      const messages = await adminMessage.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: receiverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receiverId,
                },
              },
            ],
          },
        ],
      });

      responseReturn(res, 200, { messages });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new chatController();
