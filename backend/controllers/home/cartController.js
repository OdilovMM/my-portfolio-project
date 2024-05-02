const cartModel = require("../../models/cartModel");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");

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

  getCustomerCart = async (req, res) => {
    const co = 5;
    const { userId } = req.params;
    try {
      const card_products = await cartModel.aggregate([
        {
          $match: {
            userId: {
              $eq: new ObjectId(userId),
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);
      let buy_product_item = 0;
      let calculatePrice = 0;
      let card_product_count = 0;
      const outOfStockProduct = card_products.filter(
        (p) => p.products[0].stock < p.quantity
      );
      for (let i = 0; i < outOfStockProduct.length; i++) {
        card_product_count = card_product_count + outOfStockProduct[i].quantity;
      }
      const stockProduct = card_products.filter(
        (p) => p.products[0].stock >= p.quantity
      );
      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i];
        card_product_count = buy_product_item + quantity;

        buy_product_item = buy_product_item + quantity;
        const { price, discount } = stockProduct[i].products[0];
        if (discount !== 0) {
          calculatePrice =
            calculatePrice +
            quantity * (price - Math.floor((price * discount) / 100));
        } else {
          calculatePrice = calculatePrice + quantity * price;
        }
      } // end for
      let p = [];
      let unique = [
        ...new Set(stockProduct.map((p) => p.products[0].sellerId.toString())),
      ];
      for (let i = 0; i < unique.length; i++) {
        let price = 0;
        for (let j = 0; j < stockProduct.length; j++) {
          const tempProduct = stockProduct[j].products[0];
          if (unique[i] === tempProduct.sellerId.toString()) {
            let pri = 0;
            if (tempProduct.discount !== 0) {
              pri =
                tempProduct.price -
                Math.floor((tempProduct.price * tempProduct.discount) / 100);
            } else {
              pri = tempProduct.price;
            }
            pri = pri - Math.floor((pri * co) / 100);
            price = price + pri * stockProduct[j].quantity;
            p[i] = {
              sellerId: unique[i],
              shopName: tempProduct.shopName,
              price,
              products: p[i]
                ? [
                    ...p[i].products,
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ]
                : [
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ],
            };
          }
        }
      }

      responseReturn(res, 200, {
        card_products: p,
        price: calculatePrice,
        card_product_count,
        shipping_fee: 20 * p.length,
        outOfStockProduct,
        buy_product_item,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  //   getCustomerCart = async (req, res) => {
  //     const admin = 5;
  //     const { userId } = req.params;
  //     try {
  //       const productCart = await cartModel.aggregate([
  //         {
  //           $match: {
  //             userId: {
  //               $eq: new ObjectId(userId),
  //             },
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "products",
  //             localField: "productId",
  //             foreignField: "_id",
  //             as: "products",
  //           },
  //         },
  //       ]);

  //       let buyProduct = 0;
  //       let calculatePrice = 0;
  //       let countProductCart = 0;

  //       const outStockProduct = productCart.filter(
  //         (p) => p.products[0].stock < p.quantity
  //       );
  //       for (let i = 0; i < outStockProduct.length; i++) {
  //         countProductCart = countProductCart + outStockProduct[i].quantity;
  //       }
  //       const inStockProduct = productCart.filter(
  //         (p) => p.products[0].stock >= p.quantity
  //       );
  //       for (let i = 0; i < inStockProduct.length; i++) {
  //         const { quantity } = inStockProduct[i];
  //         countProductCart = buyProduct + quantity;

  //         buyProduct = buyProduct + quantity;
  //         const { price, discount } = inStockProduct[i].products[0];
  //         if (discount !== 0) {
  //           calculatePrice =
  //             calculatePrice +
  //             quantity * (price - Math.floor((price * discount) / 100));
  //         } else {
  //           calculatePrice = calculatePrice + quantity * price;
  //         }
  //       }

  //       let p = [];
  //       let unique = [
  //         ...new Set(
  //           inStockProduct.map((p) => p.products[0].sellerId.toString())
  //         ),
  //       ];
  //       for (let i = 0; i < unique.length; i++) {
  //         let price = 0;
  //         for (let j = 0; j < inStockProduct.length; j++) {
  //           const tempProduct = inStockProduct[j].products[0];

  //           if (unique[i] === tempProduct.sellerId.toString()) {
  //             let price1 = 0;
  //             if (tempProduct.discount !== 0) {
  //               price1 =
  //                 tempProduct.price -
  //                 Math.floor((tempProduct.price * tempProduct.discount) / 100);
  //             } else {
  //               price1 = tempProduct.price1;
  //             }
  //             price1 = price1 - Math.floor((price1 * admin) / 100);
  //             price = price + price1 * inStockProduct[j].quantity;
  //             p[i] = {
  //               sellerId: unique[i],
  //               shopName: tempProduct.shopName,
  //               price,
  //               products: p[i]
  //                 ? [
  //                     ...p[i].products,
  //                     {
  //                       _id: inStockProduct[j]._id,
  //                       quantity: inStockProduct[j].quantity,
  //                       productInfo: tempProduct,
  //                     },
  //                   ]
  //                 : [
  //                     {
  //                       _id: inStockProduct[j]._id,
  //                       quantity: inStockProduct[j].quantity,
  //                       productInfo: tempProduct,
  //                     },
  //                   ],
  //             };
  //           }
  //         }
  //       }

  //       console.log(p);
  //     } catch (error) {
  //       responseReturn(res, 500, { error: error.message });
  //     }
  //   };
  addToWishlist = async (req, res) => {
    console.log(req.body);
  };
  removeFromWishlist = async (req, res) => {
    console.log(req.body);
  };
}

module.exports = new cartController();
