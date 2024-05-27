const { createToken } = require("../../utils/createToken");
const { responseReturn } = require("../../utils/response");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const Seller = require("../../models/sellerModel");

class sellerController {
  getSellerRequest = async (req, res) => {
    const { page, search, parPage } = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (search) {
      } else {
        const sellers = await Seller.find({ status: "pending" })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSellers = await Seller.find({
          status: "pending",
        }).countDocuments();
        responseReturn(res, 200, { sellers, totalSellers });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getSellerDetail = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const seller = await Seller.findById(sellerId);
      responseReturn(res, 200, { seller });
    } catch (error) {
      responseReturn(res, 404, { error: error.message });
    }
  };

  updateSellerStatus = async (req, res) => {
    const { sellerId, status } = req.body;

    try {
      await Seller.findByIdAndUpdate(sellerId, { status });
      const seller = await Seller.findById(sellerId);
      responseReturn(res, 200, { seller, message: "Seller Status Updated" });
    } catch (error) {
      responseReturn(res, 404, { error: error.message });
    }
  };

  getActiveSellers = async (req, res) => {
    let { page, search, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);
    try {
      if (search) {
        const sellers = await Seller.find({
          $text: { $search: search },
          status: "active",
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSellers = await Seller.find({
          $text: { $search: search },
          status: "active",
        }).countDocuments();
        responseReturn(res, 200, { totalSellers, sellers });
      } else {
        const sellers = await Seller.find({
          status: "active",
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSellers = await Seller.find({
          status: "active",
        }).countDocuments();
        console.log(sellers, totalSellers);
        responseReturn(res, 200, { totalSellers, sellers });
      }
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };

  getDeactiveSellers = async (req, res) => {
    let { page, search, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);
    try {
      if (search) {
        const deactiveSellers = await Seller.find({
          $text: { $search: search },
          status: "deactive",
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalDeactives = await Seller.find({
          $text: { $search: search },
          status: "deactive",
        }).countDocuments();
        responseReturn(res, 200, { totalDeactives, deactiveSellers });
      } else {
        const deactiveSellers = await Seller.find({
          status: "deactive",
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalDeactives = await Seller.find({
          status: "deactive",
        }).countDocuments();

        responseReturn(res, 200, { totalDeactives, deactiveSellers });
      }
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new sellerController();
