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
      responseReturn(res, 500, {
        error: error.message,
      });
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

  getCustomerDashboardData = async (req, res) => {
    try {
      const { userId } = req.params;

      const recentOrders = await customerOrder
        .find({
          customerId: new ObjectId(userId),
        })
        .limit(5);
      const pendingOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
          deliveryStatus: "pending",
        })
        .countDocuments(5);
      const totalOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
        })
        .countDocuments();
      const cancelledOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
          deliveryStatus: "canceled",
        })
        .countDocuments();

      responseReturn(res, 200, {
        message: "success",
        recentOrders,
        pendingOrder,
        totalOrder,
        cancelledOrder,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getAllOrdersByStatus = async (req, res) => {
    const { status, userId } = req.params;
    try {
      let orders = [];
      if (status !== "all") {
        orders = await customerOrder.find({
          customerId: new ObjectId(userId),
          deliveryStatus: status,
        });
      } else {
        orders = await customerOrder.find({
          customerId: new ObjectId(userId),
        });
      }
      responseReturn(res, 200, { orders });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getOrderDetail = async (req, res) => {
    const { orderId } = req.params;

    try {
      const myOrder = await customerOrder.findById(orderId);
      responseReturn(res, 200, { myOrder });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getAdminOrders = async (req, res) => {
    let { page, search, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);
    try {
      if (search) {
      } else {
        const orders = await customerOrder
          .aggregate([
            {
              $lookup: {
                from: "authorders",
                localField: "_id",
                foreignField: "orderId",
                as: "suborder",
              },
            },
          ])
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrders = await customerOrder.aggregate([
          {
            $lookup: {
              from: "authorders",
              localField: "_id",
              foreignField: "orderId",
              as: "suborder",
            },
          },
        ]);
        responseReturn(res, 200, { orders, totalOrder: totalOrders.length });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getSingleOrderDetail = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await customerOrder.aggregate([
        {
          $match: { _id: new ObjectId(orderId) },
        },
        {
          $lookup: {
            from: "authorders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborder",
          },
        },
      ]);
      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };

  adminOrderUpdateStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        deliveryStatus: status,
      });
      responseReturn(res, 200, { message: "Customer Order Status Updated" });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };

  getSellerOrders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, search, parPage } = req.query;
    console.log(req.query);
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);

    try {
      if (search) {
      } else {
        const orders = await authOrder
          .find({
            sellerId,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrders = await authOrder
          .find({
            sellerId,
          })
          .countDocuments();
        responseReturn(res, 200, { orders, totalOrder: totalOrders.length });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getSellerSingleOrderDetail = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await authOrder.findById(orderId);
      responseReturn(res, 200, { order });
      console.log(order);
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };

  sellerOrderUpdateStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        deliveryStatus: status,
      });
      responseReturn(res, 200, { message: "Customer Order Status Updated" });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new orderController();
