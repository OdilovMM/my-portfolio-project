const Product = require("../../models/productModel");
const Banner = require("../../models/bannerModel");
const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const {
  mongo: { ObjectId },
} = require("mongoose");

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

  getProducts = async (req, res) => {
    console.log(req.query);
    console.log(req.id);
    const { page, search, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (search) {
        const products = await Product.find({
          $text: { $search: search },
          sellerId: id,
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalProducts = await Product.find({
          $text: { $search: search },
          sellerId: id,
        }).countDocuments();
        responseReturn(res, 200, { products, totalProducts });
      } else {
        const products = await Product.find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalProducts = await Product.find({
          sellerId: id,
        }).countDocuments();
        responseReturn(res, 200, { products, totalProducts });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // get single product
  getProduct = async (req, res) => {
    const { productId } = req.params;
    console.log("getA_Product:", productId);

    try {
      const product = await Product.findById(productId);
      console.log(product);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };

  updateProduct = async (req, res) => {
    console.log(req.body);
    let { name, description, discount, price, brand, stock, productId } =
      req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");

    try {
      await Product.findByIdAndUpdate(
        productId,
        {
          name,
          description,
          discount,
          price,
          brand,
          stock,
          productId,
          slug,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      const product = await Product.findById(productId);
      responseReturn(res, 200, { product, message: "Product Updated" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  updateProductImage = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      console.log(field, files);

      const { oldImage, productId } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 400, { error: error.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
            secure: true,
          });

          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
          });

          if (result) {
            let { images } = await Product.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;
            await Product.findByIdAndUpdate(productId, { images });

            const product = await Product.findById(productId);
            responseReturn(res, 200, {
              product,
              message: "Product Image updated",
            });
          } else {
            responseReturn(res, 404, { error: "Image update failed" });
          }
        } catch (error) {
          responseReturn(res, 500, { error: error.message });
        }
      }
    });
  };
  addBanner = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      const { productId } = field;
      const { mainban } = files;

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      });

      try {
        const { slug } = await Product.findById(productId);
        const result = await cloudinary.uploader.upload(mainban.filepath, {
          folder: "banner",
        });
        const banner = await Banner.create({
          productId,
          banner: result.url,
          link: slug,
        });
        responseReturn(res, 200, { banner, message: "Banner Add Success" });
      } catch (error) {
        console.log(error);
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  getBanner = async (req, res) => {
    const { productId } = req.params;
    try {
      const getBanner = await Banner.findOne({
        productId: new ObjectId(productId),
      });
      responseReturn(res, 200, { getBanner });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  getAllBanners = async (req, res) => {
    console.log("get banners");
    try {
      const getBanners = await Banner.find();
      responseReturn(res, 200, { getBanners });
      console.log(getBanners);
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  updateBanner = async (req, res) => {
    const { bannerId } = req.params;
    const form = formidable({});

    form.parse(req, async (err, _, files) => {
      const { mainban } = files;

      try {
        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_API_KEY,
          api_secret: process.env.CLOUD_API_SECRET,
          secure: true,
        });

        const banner = await Banner.findById(bannerId);
        let temp = banner.banner.split("/");
        temp = temp[temp.length - 1];
        const imageName = temp.split(".")[0];
        await cloudinary.uploader.destroy(imageName);

        const { url } = await cloudinary.uploader.upload(mainban.filepath, {
          folder: "banner",
        });

        await Banner.findByIdAndUpdate(bannerId, {
          banner: url,
        });

        const updatedBanner = await Banner.findById(bannerId);
        responseReturn(res, 200, {
          banner: updatedBanner,
          message: "Banner Updated",
        });
      } catch (error) {
        console.log(error);
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
}

module.exports = new productController();
