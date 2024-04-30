const Category = require("./../../models/categoryModel");
const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");

class homeController {
  getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find({});
      responseReturn(res, 200, { categories });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new homeController();
