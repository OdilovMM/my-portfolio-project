const { createToken } = require("../../utils/createToken");
const { responseReturn } = require("../../utils/response");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const Seller = require("../../models/sellerModel");

class sellerController {
  getSellerRequest = async (req, res) => {
    console.log(req.query);
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
    console.log(sellerId);

    try {
      const seller = await Seller.findById(sellerId);
      console.log("seller:::", seller);
      responseReturn(res, 200, { seller });
    } catch (error) {
      responseReturn(res, 404, { error: error.message });
    }
  };

  updateSellerStatus = async (req, res) => {
    const { sellerId, status } = req.body;
    console.log("seller:::", sellerId, status);

    try {
      await Seller.findByIdAndUpdate(sellerId, { status });
      const seller = await Seller.findById(sellerId);
      responseReturn(res, 200, { seller, message: "Seller Status Updated" });
    } catch (error) {
      responseReturn(res, 404, { error: error.message });
    }
  };
}

module.exports = new sellerController();
