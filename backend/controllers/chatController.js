const Admin = require("../models/adminModel");
const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");
const formidable = require("formidable");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const Message = require("../models/chat/sellerCustomerMessageModel");
const { responseReturn } = require("../utils/response");

class chatController {
  // addChatFriend = async (req, res) => {
  //   const { sellerId, userId } = req.body;

  //   try {
  //     if (sellerId !== "") {
  //       const seller = await Seller.findById(sellerId);
  //       const customer = await Customer.findById(userId);

  //       const checkSeller = await sellerCustomerModel.findOne({
  //         $and: [
  //           {
  //             myId: {
  //               $eq: userId,
  //             },
  //           },
  //           {
  //             myFriends: {
  //               $elemMatch: {
  //                 fdId: sellerId,
  //               },
  //             },
  //           },
  //         ],
  //       });
  //       if (!checkSeller) {
  //         await sellerCustomerModel.updateOne(
  //           {
  //             myId: userId,
  //           },
  //           {
  //             $push: {
  //               myFriends: {
  //                 fdId: sellerId,
  //                 name: seller.shopInfo?.shopName,
  //                 image: seller.image,
  //               },
  //             },
  //           }
  //         );
  //       }
  //       const checkCustomer = await sellerCustomerModel.findOne({
  //         $and: [
  //           {
  //             myId: {
  //               $eq: sellerId,
  //             },
  //           },
  //           {
  //             myFriends: {
  //               $elemMatch: {
  //                 fdId: userId,
  //               },
  //             },
  //           },
  //         ],
  //       });
  //       if (!checkSeller) {
  //         await sellerCustomerModel.updateOne(
  //           {
  //             myId: sellerId,
  //           },
  //           {
  //             $push: {
  //               myFriends: {
  //                 fdId: userId,
  //                 name: customer.name,
  //                 image: "",
  //               },
  //             },
  //           }
  //         );
  //       }
  //       console.log(checkCustomer);
  //       console.log(checkSeller);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new chatController();
