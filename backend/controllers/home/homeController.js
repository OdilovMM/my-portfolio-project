const Category = require("./../../models/categoryModel");
const Products = require("./../../models/productModel");
const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");

class homeController {
  formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find({});
      responseReturn(res, 200, { categories });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getProducts = async (req, res) => {
    try {
      const products = await Products.find({}).limit(12).sort({
        createdAt: -1,
      });
      const allProduct1 = await Products.find({}).limit(9).sort({
        createdAt: -1,
      });
      const latestProduct = this.formateProduct(allProduct1);

      const allProduct2 = await Products.find({}).limit(9).sort({
        rating: -1,
      });
      const topRatedProduct = this.formateProduct(allProduct2);

      const allProduct3 = await Products.find({}).limit(9).sort({
        discount: -1,
      });
      const discountProduct = this.formateProduct(allProduct3);

      responseReturn(res, 200, {
        products,
        latestProduct,
        topRatedProduct,
        discountProduct,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new homeController();
