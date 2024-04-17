const adminModel = require("../models/adminModel");
const Admin = require("../models/adminModel");
const { createToken } = require("../utils/createToken");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");

class authControllers {
  admin_login = async (req, res) => {
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

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        console.log("Seller");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new authControllers();
