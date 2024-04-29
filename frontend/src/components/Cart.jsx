import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import Rating from "./Rating";

const Cart = ({ product, index }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  //   const dt = product.name;
  //   const productName = dt.replace(/\s+/g, "-");

  return (
    <>
      <div className="w-[232px] md:w-[210px] md-lg:w-[290px] h-[453px] bg-white mb-8 group gap-5  rounded-[3px] shadow-lg  relative cursor-pointer">
        <div className="flex flex-col">
          <div className="relative h-[358px]  overflow-hidden ">
            <Link className="h-[358px]  w-full flex justify-center items-center transition-transform duration-500 transform scale-105 group-hover:scale-110">
              <img
                // src={`http://localhost:3000/images/products/${index + 1}.webp`}
                src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/11/product-photography-tips-17-1.jpg"
                alt=""
                className=" sm:w-full w-full object-fit "
              />
            </Link>
            {/* sale */}
            <div className="flex flex-col  absolute top-4 gap-3 ">
              <span className="bg-red-500 text-[14px] shadow-sm pl-2">
                sale
              </span>
              <span className="bg-black text-white px-2 shadow-sm text-[14px]">
                -12%
              </span>
            </div>
            {/* link */}
            <div className="absolute top-9 right-1 flex flex-col gap-2 transform translate-x-9  opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500">
              <button
                onClick={() => setClick(!click)}
                className="p-2 bg-white shadow-md hover:bg-pink-500 transition duration-900 ease-in-out"
              >
                {click ? (
                  <AiFillHeart color="red" size={18} />
                ) : (
                  <AiOutlineHeart size={18} />
                )}
              </button>
              <Link
                to="/product/details/new-product"
                className="p-2 bg-white shadow-md hover:bg-pink-500 transition duration-900 ease-in-out"
              >
                <AiOutlineEye size={18} />
              </Link>
            </div>

            {/* add cart */}
            <div
              style={{
                zIndex: "1",
              }}
              className="absolute  bottom-0 w-full transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500"
            >
              <button className="flex h-[45px] bg-black hover:bg-pink-500 transition duration-900 ease-in-out w-full flex-row gap-2 items-center justify-center">
                <MdAddShoppingCart size={20} color="white" />
                <span className="text-white font-Poppins">Add Cart</span>
              </button>
            </div>
          </div>
          {/* bottom info */}
          <div className="flex flex-col h-[74] px-2 py-2 ">
            <h2>Product name</h2>
            <div className="flex flex-row items-center justify-between">
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                $ 190
                <span className="pl-2 line-through text-red-600">150</span>
              </p>
              <div className="flex ">
                <Rating ratings={4.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
