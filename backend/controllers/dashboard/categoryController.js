const Category = require("../../models/categoryModel");
const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;

class categoryController {
  addCategory = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "Something went wrong" });
      } else {
        let { name } = fields;
        let { image } = files;

        name = name.trim();
        const slug = name.split(" ").join("-");

        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_API_KEY,
          api_secret: process.env.CLOUD_API_SECRET,
          secure: true,
        });
        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categories",
          });
          if (result) {
            const category = await Category.create({
              name,
              slug,
              image: result.url,
            });
            responseReturn(res, 201, {
              message: "Category added successfully",
            });
          } else {
            responseReturn(res, 404, {
              error: "Something went wrong with image upload",
            });
          }
        } catch (error) {
          responseReturn(res, 500, { error: "Internal Server Error" });
        }
      }
    });
  };

  getCategory = async (req, res) => {
    console.log(req.query);
    const { page, search, parPage } = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (search && page && parPage) {
        const categories = await Category.find({
          $text: { $search: search },
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalCategories = await Category.find({
          $text: { $search: search },
        }).countDocuments();
        responseReturn(res, 200, { categories, totalCategories });
      } else if (search === "" && page && parPage) {
        const categories = await Category.find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalCategories = await Category.find({}).countDocuments();
        responseReturn(res, 200, { categories, totalCategories });
      } else {
        const categories = await Category.find({}).sort({ createdAt: -1 });

        const totalCategories = await Category.find({}).countDocuments();
        responseReturn(res, 200, { categories, totalCategories });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new categoryController();
