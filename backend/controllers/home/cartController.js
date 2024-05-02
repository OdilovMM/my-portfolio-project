const cartModel = require("../../models/cartModel");
const { responseReturn } = require("../../utils/response");

class cartController {
  addToCart = async (req, res) => {
    console.log(req.body);
    const { userId, productId, quantity } = req.body;
    try {
      const product = await cartModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });

      if (product) {
        responseReturn(res, 404, { error: "Product Already Added To Card" });
      } else {
        const product = await cartModel.create({
          userId,
          productId,
          quantity,
        });
        console.log(product);
        responseReturn(res, 201, {
          message: "Added To Card",
          product,
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
//   removeFromCart = async (req, res) => {
//     console.log(req.body);
//   };
//   addToWishlist = async (req, res) => {
//     console.log(req.body);
//   };
//   removeFromWishlist = async (req, res) => {
//     console.log(req.body);
//   };
}

module.exports = new cartController();
