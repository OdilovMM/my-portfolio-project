import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";

const EditProduct = () => {
  const categories = [
    {
      id: 1,
      name: "Clothes",
    },
    {
      id: 2,
      name: "Shoes",
    },
    {
      id: 3,
      name: "TShirts",
    },
    {
      id: 4,
      name: "Laptops",
    },
    {
      id: 5,
      name: "Outdoors",
    },
    {
      id: 6,
      name: "Gardening",
    },
    {
      id: 7,
      name: "Mobile",
    },
    {
      id: 8,
      name: "Car",
    },
    {
      id: 9,
      name: "Books",
    },
    {
      id: 10,
      name: "Bikes",
    },
  ];

  const [product, setProduct] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const inputHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleCategorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      let searchedValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(searchedValue);
    } else {
      setAllCategory(categories);
    }
  };

  const [imgFiles, setImgFiles] = useState([]);
  const [showImage, setImageShow] = useState([]);

  const handleChangeImage = (img, files) => {
    if (files.length > 0) {
    } else {
    }
  };

  useEffect(() => {
    setProduct({
      name: "Kids Jeans",
      description: "very nice and only made with cotton",
      discount: 10,
      price: 185,
      brand: "Adidas",
      stock: 12,
    });

    setCategory("Clothes");
    setImageShow([
      "http://localhost:3000/images/category/1.jpg",
      "http://localhost:3000/images/category/1.jpg",
      "http://localhost:3000/images/category/1.jpg",
    ]);
  }, []);

  return (
    <div className="px-2 lg:px-7 pt-4">
      <div className="w-full p-4 bg-[#3D464D] rounded-[5px] ">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-white font-semibold">Edit Product</h2>
          <Link
            to="/seller/dashboard/products"
            className="bg-[#a6afb6] px-2 py-1 rounded-[5px]"
          >
            All Products
          </Link>
        </div>
        <div>
          <form>
            <div className="flex flex-col mb-2 md:flex-row gap-3 w-full text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product name"
                  onChange={inputHandler}
                  value={product.name}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Brand Name"
                  onChange={inputHandler}
                  value={product.brand}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>
            </div>

            <div className="flex flex-col mb-2 md:flex-row gap-3 w-full text-white">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setShow(!show)}
                  type="text"
                  id="category"
                  placeholder="--select category--"
                  onChange={inputHandler}
                  value={category}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#dfe2dd] border border-slate-700 rounded-md text-[#333]"
                />

                <div
                  className={`absolute top-[39%] rounded-md bg-[#3D464D] gap-1 w-full overflow-hidden transition-all ${
                    show ? "h-[250px]" : "h-0 hidden"
                  }`}
                >
                  <div className="w-full  absolute mt-[1px]">
                    <input
                      value={searchValue}
                      onChange={handleCategorySearch}
                      type="text"
                      //   className="px-3 w-full focus:border-gray-400 outline-none  rounded-[3px] text-black overflow-hidden"
                      className="px-4 py-2 w-full  outline-none bg-[#dfe2dd] border border-slate-700 rounded-md text-[#333]"
                      name=""
                      placeholder="Search"
                      id=""
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-y-scroll ">
                    {allCategory.map((categ, index) => (
                      <span
                        className={`px-4 py-1 font-semibold mb-1 hover:bg-gray-600 w-full cursor-pointer ${
                          category === categ.name && "bg-gray-600"
                        } `}
                        onClick={() => {
                          setShow(false);
                          setCategory(categ.name);
                          setSearchValue("");
                          setAllCategory(categories);
                        }}
                      >
                        {categ.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="stock"
                  onChange={inputHandler}
                  value={product.stock}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>
            </div>

            <div className="flex flex-col mb-2 md:flex-row gap-3 w-full text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  onChange={inputHandler}
                  value={product.price}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount"
                  onChange={inputHandler}
                  value={product.discount}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>
            </div>

            <div className="flex mb-4 flex-col w-full gap-1">
              <label htmlFor="description" className=" text-white">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Product description"
                onChange={inputHandler}
                value={product.description}
                className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                cols="10"
                rows="4"
              ></textarea>
            </div>

            <div className=" grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-white mb-4">
              {showImage.map((img, index) => (
                <div className="h-[180px] relative">
                  <label htmlFor={index}>
                    <img
                      src={img}
                      //   src={img.url}
                      alt=""
                      className="w-full h-full rounded-sm object-cover"
                    />
                  </label>
                  <input
                    type="file"
                    id={index}
                    className="hidden"
                    onChange={(e) => handleChangeImage(img.e.target.files)}
                  />
                </div>
              ))}
              <label
                htmlFor="image"
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border hover:border-red-300 w-full text-white "
              >
                <span>
                  <LuImagePlus size={30} />
                </span>
                <span>Select image</span>
              </label>
            </div>

            <div className="flex">
              <button className="bg-[#94A3B8] w-[250px] py-2 mt-1 rounded-[5px]">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
