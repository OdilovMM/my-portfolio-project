const Admin = require("../models/adminModel");
const Seller = require("../models/sellerModel");
const sellerCustomer = require("../models/chat/sellerCustomerModel");
const { createToken } = require("../utils/createToken");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");

class authControllers {
  adminLogin = async (req, res) => {
    const { password, email } = req.body;

    try {
      const admin = await Admin.findOne({ email }).select("+password");
      console.log(admin);
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);

        // now generating a token
        if (match) {
          //
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login success" });
        } else {
          responseReturn(res, 400, { error: "Wrong password" });
        }
      } else {
        responseReturn(res, 400, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  sellerRegister = async (req, res) => {
    const { email, name, password } = req.body;
    try {
      const existSeller = await Seller.findOne({ email });
      if (existSeller) {
        responseReturn(res, 404, { error: "Email already in use" });
      } else {
        const seller = await Seller.create({
          name,
          email,
          password: await bcrypt.hash(password, 12),
          method: "manual",
          shopInfo: {},
        });
        await sellerCustomer.create({
          myId: seller.id,
        });

        const token = await createToken({
          id: seller.id,
          role: seller.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        responseReturn(res, 201, { token, message: "Successfully registered" });
      }
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { error: "Internal Server error" });
    }
  };

  sellerLogin = async (req, res) => {
    const { password, email } = req.body;
    try {
      const seller = await Seller.findOne({ email }).select("+password");
      console.log(seller);
      if (seller) {
        const match = await bcrypt.compare(password, seller.password);

        // now generating a token
        if (match) {
          //
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login success" });
        } else {
          responseReturn(res, 400, { error: "Wrong password" });
        }
      } else {
        responseReturn(res, 400, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await Admin.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await Seller.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal server error" });
    }
  };

  uploadProfileImage = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, _, files) => {
      console.log(err);
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      });

      const { image } = files;

      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "profile",
        });
        console.log(result);

        if (result) {
          await Seller.findByIdAndUpdate(id, { image: result.url });
          const userInfo = await Seller.findById(id);
          responseReturn(res, 200, {
            userInfo,
            message: "Profile Image uploaded",
          });
        } else {
          responseReturn(res, 400, { error: "Image upload failed" });
        }
      } catch (error) {
        console.log(error);
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  addProfileAddress = async (req, res) => {
    const { division, district, shopName, subDistrict } = req.body;
    const { id } = req;

    try {
      await Seller.findByIdAndUpdate(id, {
        shopInfo: {
          shopName,
          division,
          district,
          subDistrict,
        },
      });
      const userInfo = await Seller.findById(id);
      responseReturn(res, 201, {
        message: "User information updated",
        userInfo,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new authControllers();
