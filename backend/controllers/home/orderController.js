const Order = require("../../models/orderModel");
const moment = require("moment");
const { responseReturn } = require("../../utils/response");
const authOrder = require("../../models/authOrderModel");
const customerOrder = require("../../models/customerOrderModel");
const Cart = require("../../models/cartModel");

const {
  mongo: { ObjectId },
} = require("mongoose");

class orderController {
  paymentCheck = async (id) => {
    try {
      const order = await customerOrder.findById(id);
      if (order.paymentStatus === "unpaid") {
        //
        await customerOrder.findByIdAndUpdate(id, {
          deliveryStatus: "canceled",
        });
        await authOrder.updateMany(
          {
            orderId: id,
          },
          {
            deliveryStatus: "canceled",
          }
        );
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  placeOrderSelectedProduct = async (req, res) => {
    const { price, products, shippingFee, shippingToAddress, items, userId } =
      req.body;

    let authorOrderData = [];
    let cartId = [];
    const formatData = moment(Date.now()).format("LLL");
    let customerOrderProduct = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i].products;
      for (let j = 0; j < product.length; j++) {
        const tempCustomerProduct = product[j].productInfo;
        tempCustomerProduct.quantity = product[j].quantity;
        customerOrderProduct.push(tempCustomerProduct);
        if (product[j]._id) {
          cartId.push(product[j]._id);
        }
      }
    }
   

    try {
      const order = await customerOrder.create({
        customerId: userId,
        shippingInfo: shippingToAddress,
        products: customerOrderProduct,
        price: price + shippingFee,
        paymentStatus: "unpaid",
        deliveryStatus: "pending",
        date: formatData,
      });

      for (let i = 0; i < products.length; i++) {
        const sellerProduct = products[i].products;
        const totalPrice = products[i].price;
        const sellerId = products[i].sellerId;
        let storeProducts = [];
        for (let j = 0; j < sellerProduct.length; j++) {
          const tempSellerProduct = sellerProduct[j].productInfo;
          tempSellerProduct.quantity = sellerProduct[j].quantity;
          storeProducts.push(tempSellerProduct);
        }
        authorOrderData.push({
          orderId: order.id,
          sellerId,
          products: storeProducts,
          price: totalPrice,
          paymentStatus: "unpaid",
          shippingInfo: "Red Market Warehouse",
          deliveryStatus: "pending",
          date: formatData,
        });
      }

      await authOrder.insertMany(authorOrderData);
      for (let k = 0; k < cartId.length; k++) {
        await Cart.findByIdAndDelete(cartId[k]);
      }
      setTimeout(() => {
        this.paymentCheck(order.id);
      }, 5 * 60 * 60 * 1000); // cancel in  5 hours later if not payment done

      responseReturn(res, 200, { message: "Order placed", orderId: order.id });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new orderController();
