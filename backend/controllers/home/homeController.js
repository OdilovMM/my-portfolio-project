const Category = require("./../../models/categoryModel");
const Products = require("./../../models/productModel");
const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const queryProducts = require("../../utils/queryProducts");

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

  getProductsByPriceRange = async (req, res) => {
    try {
      const priceRange = {
        low: 0,
        high: 0,
      };

      const products = await Products.find({}).limit(20).sort({
        createdAt: -1,
      });

      const latestProduct = this.formateProduct(products);
      const getPriceProduct = await Products.find({}).sort({
        price: 1,
      });
      if (getPriceProduct.length > 0) {
        priceRange.high = getPriceProduct[getPriceProduct.length - 1].price;
        priceRange.low = getPriceProduct[0].price;
      }

      responseReturn(res, 200, {
        latestProduct,
        priceRange,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  getProductQuery = async (req, res) => {
    const parPage = 8;
    req.query.parPage = parPage;
    console.log(req.query);

    try {
      const products = await Products.find({}).sort({
        createdAt: -1,
      });

      const totalProducts = new queryProducts(products, req.query)
        .queryCategory()
        .queryRating()
        .queryPrice()
        .querySortPrice()
        .getProductsCount();

      const result = new queryProducts(products, req.query)
        .queryCategory()
        .queryRating()
        .queryPrice()
        .querySortPrice()
        .paginate()
        .limitField()
        .getProducts();

      console.log(result);

      responseReturn(res, 200, {
        products: result,
        totalProducts: totalProducts,
        parPage,
      });
    } catch (error) {
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
}

module.exports = new homeController();
