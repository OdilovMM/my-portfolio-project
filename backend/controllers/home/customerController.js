const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const Customer = require("../../models/customerModel");
const { createToken } = require("../../utils/createToken");
const { responseReturn } = require("../../utils/response");
const bcrypt = require("bcrypt");

class authControllers {
  customerRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const customer = await Customer.findOne({ email });
      if (customer) {
        responseReturn(res, 404, {
          error: "Email already exist, Please Log in",
        });
      } else {
        const newCustomer = await Customer.create({
          name: name.trim(),
          email: email.toLowerCase(),
          password: await bcrypt.hash(password, 12),
          method: "manually",
        });
        await sellerCustomerModel.create({
          myId: newCustomer.id,
        });
        const token = await createToken({
          id: newCustomer.id,
          name: newCustomer.name,
          email: newCustomer.email,
          method: newCustomer.method,
        });

        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        console.log(newCustomer, token);
        responseReturn(res, 201, {
          message: "User Registered Successful",
          token,
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server error" });
    }
  };

  customerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      const customer = await Customer.findOne({ email }).select("+password");
      if (customer) {
        const match = await bcrypt.compare(password, customer.password);
        if (match) {
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });

          responseReturn(res, 200, {
            message: "Login Successful",
            token,
          });
        } else {
          responseReturn(res, 404, { error: "Wrong password" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server error" });
    }
  };
}

module.exports = new authControllers();
