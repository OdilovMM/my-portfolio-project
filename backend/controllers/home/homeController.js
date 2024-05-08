const Category = require("./../../models/categoryModel");
const Products = require("./../../models/productModel");
const Reviews = require("./../../models/reviewModel");
const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const queryProducts = require("../../utils/queryProducts");
const moment = require("moment");
const {
  mongo: { ObjectId },
} = require("mongoose");

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

  getProduct = async (req, res) => {
    const { slug } = req.params;
    try {
      const product = await Products.findOne({ slug });
      const categoryRelatedProducts = await Products.find({
        $and: [
          {
            _id: {
              $ne: product._id,
            },
          },
          {
            category: {
              $eq: product.category,
            },
          },
        ],
      }).limit(20);

      const sellerRelatedProducts = await Products.find({
        $and: [
          {
            _id: {
              $ne: product._id,
            },
          },
          {
            sellerId: {
              $eq: product.sellerId,
            },
          },
        ],
      }).limit(5);

      responseReturn(res, 200, {
        product,
        categoryRelatedProducts,
        sellerRelatedProducts,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
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
      responseReturn(res, 500, {
        error: error.message,
      });
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
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };

  getProductQuery = async (req, res) => {
    const parPage = 8;
    req.query.parPage = parPage;

    try {
      const products = await Products.find({}).sort({
        createdAt: -1,
      });

      const totalProducts = new queryProducts(products, req.query)
        .queryCategory()
        .queryRating()
        .queryPrice()
        .querySearch()
        .querySortPrice()
        .getProductsCount();

      const result = new queryProducts(products, req.query)
        .queryCategory()
        .queryRating()
        .queryPrice()
        .querySearch()
        .querySortPrice()
        .paginate()
        .limitField()
        .getProducts();

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

  addProductReview = async (req, res) => {
    const { productId, review, rating, name } = req.body;

    try {
      await Reviews.create({
        productId,
        name,
        rating,
        review,
        date: moment(Date.now()).format("LL"),
      });

      let rat = 0;
      const reviews = await Reviews.find({
        productId,
      });
      for (let i = 0; i < reviews.length; i++) {
        rat = rat + reviews[i].rating;
      }
      let productRating = 0;
      if (reviews.length !== 0) {
        productRating = (rat / reviews.length).toFixed(1);
      }
      await Products.findByIdAndUpdate(productId, {
        rating: productRating,
      });

      responseReturn(res, 201, {
        message: "Your review added",
      });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };

  getAllReviews = async (req, res) => {
    const { productId } = req.params;
    let { pageNumber } = req.query;
    pageNumber = parseInt(pageNumber);
    const limit = 5;
    const skipPage = limit * (pageNumber - 1);

    try {
      let getRating = await Reviews.aggregate([
        {
          $match: {
            productId: {
              $eq: new ObjectId(productId),
            },
            rating: {
              $not: {
                $size: 0,
              },
            },
          },
        },
        {
          $unwind: "$rating",
        },
        {
          $group: {
            _id: "$rating",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let ratingReview = [
        {
          rating: 5,
          sum: 0,
        },
        {
          rating: 4,
          sum: 0,
        },
        {
          rating: 3,
          sum: 0,
        },
        {
          rating: 2,
          sum: 0,
        },
        {
          rating: 1,
          sum: 0,
        },
      ];

      for (let i = 0; i < ratingReview.length; i++) {
        for (let j = 0; j < getRating.length; j++) {
          if (ratingReview[i].rating === getRating[j]._id) {
            ratingReview[i].sum = getRating[j].count;
            break;
          }
        }
      }

      const getAll = await Reviews.find({
        productId,
      });
      const reviews = await Reviews.find({
        productId,
      })
        .skip(skipPage)
        .limit(limit)
        .sort({ createdAt: -1 });

      responseReturn(res, 200, {
        reviews,
        totalReview: getAll.length,
        ratingReview,
      });
    } catch (error) {
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
}

module.exports = new homeController();
