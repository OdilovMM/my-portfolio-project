const Product = require("../../models/productModel");
const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;

class productController {
  addProduct = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        stock,
        price,
        discount,
        brand,
        shopName,
      } = field;
      const { images } = files;

      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      });

      try {
        let allImageUrl = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",
          });
          allImageUrl = [...allImageUrl, result.url];
        }

        await Product.create({
          sellerId: id,
          name,
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          brand: brand.trim(),
        });

        responseReturn(res, 201, { message: "Product Added" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  getProducts = async (req, res) => {};
}

module.exports = new productController();
