const MyWallet = require("../../models/myWalletModel");
const SellerWallet = require("../../models/sellerWalletModel");
const Products = require("../../models/productModel");
const authorOrders = require("../../models/authOrderModel");
const CustomerOrders = require("../../models/customerOrderModel");
const Sellers = require("../../models/sellerModel");
const Customers = require("../../models/customerModel");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");

class dashboardController {
  getAdminDashboardInfo = async (req, res) => {
    const { id } = req;

    try {
      const totalSales = await MyWallet.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);
      const totalProducts = await Products.find({}).countDocuments();
      const totalOrders = await CustomerOrders.find({}).countDocuments();
      const totalCustomers = await Customers.find({}).countDocuments();
      const totalSellers = await Sellers.find({}).countDocuments();
      const totalDeactiveSellers = await Sellers.find({
        status: "deactive",
      }).countDocuments();
      const recentOrders = await CustomerOrders.find({}).limit(8);

      responseReturn(res, 200, {
        totalSales: totalSales.length > 0 ? totalSales[0].totalAmount : 0,
        totalProducts,
        totalOrders,
        totalCustomers,
        totalSellers,
        recentOrders,
        totalDeactiveSellers,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  getSellerDashboardInfo = async (req, res) => {
    const { id } = req;

    try {
      const totalSales = await SellerWallet.aggregate([
        {
          $match: {
            sellerId: {
              $eq: id,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);
      const totalProducts = await Products.find({
        sellerId: new Object(id),
      }).countDocuments();

      const totalOrders = await authorOrders
        .find({
          sellerId: new Object(id),
        })
        .countDocuments();

      const totalPendingOrder = await authorOrders
        .find({
          $and: [
            {
              sellerId: {
                $eq: new ObjectId(id),
              },
            },
            {
              deliveryStatus: {
                $eq: "pending",
              },
            },
          ],
        })
        .countDocuments();

      

      const recentOrders = await authorOrders
        .find({
          sellerId: new ObjectId(id),
        })
        .limit(3);

      responseReturn(res, 200, {
        totalSales: totalSales.length > 0 ? totalSales[0].totalAmount : 0,
        totalProducts,
        totalOrders,
        recentOrders,
        totalPendingOrder,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new dashboardController();
