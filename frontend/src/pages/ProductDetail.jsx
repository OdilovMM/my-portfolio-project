import React, { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import {
  BreadCrumbs,
  Cart,
  ProductDescription,
  ProductReviews,
  Rating,
} from "../components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const images = [1, 2, 3, 4, 5, 6];
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");

  const discount = 8;
  const stock = 2;

  const price = 600;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="bg-[url('http://localhost:3000/images/banner/shop.png')]  h-[220px] mt-6 bg-cover bg-no-repeat bg-left">
        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-black">
          <h2 className="text-3xl font-bold">Product Details</h2>
          <div className="flex justify-center items-center gap-2 text-2xl w-full">
            <BreadCrumbs
              from="/"
              fromPage="Home"
              to="/product/details/:defea"
              iconSize={27}
              toPage="Product Details"
              iconColor="black"
            />
          </div>
        </div>
      </div>

      <div className="w-[85%] py-4 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
        <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
          <div>
            {/* product main image */}
            <div className="p-5 border">
              <img
                className="h-[400px] w-full object-contain"
                src={
                  image
                    ? `http://localhost:3000/images/products/${image}.webp`
                    : `http://localhost:3000/images/products/${images[2]}.webp`
                }
                alt=""
              />
            </div>
            {/* product carousel */}
            <div className="py-3">
              {images && (
                <Carousel
                  autoPlay={false}
                  infinite={true}
                  responsive={responsive}
                  draggable={false}
                  transitionDuration={500}
                >
                  {images.map((img, i) => {
                    return (
                      <div key={i} onClick={() => setImage(img)}>
                        <img
                          className="h-[120px] cursor-pointer"
                          src={`http://localhost:3000/images/products/${img}.webp`}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </Carousel>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-3xl capitalize text-slate-400 font-bold">
              <h2>Product name</h2>
            </div>

            {/* rating */}
            <div className="flex justify-start items-center gap-4">
              <div className="flex text-xl">
                <Rating ratings={4.5} />
              </div>
              <span>(23 reviews)</span>
            </div>

            {/* product price */}
            <div className="text-2xl text-red-600 font-bold flex gap-3">
              {discount !== 0 ? (
                <div className="flex flex-row gap-2 items-center">
                  <h2>
                    Price: $<span className="line-through ">{price}</span>
                  </h2>
                  <h2 className="flex items-center gap-2 justify-between">
                    ${price - Math.floor((price * discount) / 100)}{" "}
                    <RiDiscountPercentFill
                      color="green"
                      size={28}
                      title="discount"
                    />
                    <span className="text-blue-500">(-{discount}%)</span>
                    <FaArrowTrendDown
                      color="red"
                      title="price decreased"
                      size={28}
                    />
                  </h2>
                </div>
              ) : (
                <>
                  <h2>Price: $200</h2>
                </>
              )}
            </div>

            {/* description */}

            <div className="text-black">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
                perferendis error minima, cumque aliquam odio illum commodi
                dolor iusto magnam excepturi pariatur? Sint aperiam esse rerum,
                iure natus ab recusandae?
              </p>
            </div>

            {/* actions */}

            <div className="flex gap-3 pb-10 border-b items-center">
              {stock ? (
                <>
                  <div className="flex h-[50px] justify-center items-center text-xl gap-1">
                    <button className="px-8 py-2 bg-slate-400">-</button>
                    <span className="w-[55px] text-center bg-slate-300  py-2">
                      {" "}
                      1
                    </span>
                    <button className="px-8 py-2 bg-slate-400">+</button>
                  </div>
                  <div className="flex h-[50px] justify-center items-center text-xl gap-1">
                    <button className=" w-[145px] bg-slate-300 py-2 flex items-center justify-center gap-2">
                      <span>Add To Cart</span>
                      <FaCartPlus />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center gap-2 h-[41px]">
                  <div className="flex bg-slate-300  h-full justify-center items-center text-xl gap-1">
                    <h2 className="px-3 text-red-600 font-bold">
                      Out of stock
                    </h2>
                  </div>
                </div>
              )}
              <div className="flex h-[50px] justify-center items-center text-xl gap-1">
                <button className=" bg-slate-300 px-3 py-2">
                  <IoHeart size={25} color="red" title="add to cart" />
                </button>
              </div>
            </div>

            {/* availability */}

            <div className="flex gap-4 py-5 border-b">
              <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                <h2 className="flex items-center justify-start gap-1">
                  <span> Available</span>
                  <MdEventAvailable />
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                <span
                  className={`text-${stock ? "green" : "red"} font-semibold`}
                >
                  {stock ? `In Stock: (${stock})` : `Out Of Stock: (${stock})`}
                </span>
              </div>
            </div>

            <div className="flex gap-4 py-5 border-b">
              <div className="flex h-[50px] justify-center items-center text-xl gap-1">
                <button className="px-8 py-2 bg-green-400">Buy Now</button>

                <button className="px-8 py-2 bg-green-600">Chat Seller</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[85%] py-4 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-12">
        <div className="flex flex-wrap">
          <div className="w-[72%] md-lg::w-full">
            <div className="pr-4 md-lg:pr-0">
              <div className="grid grid-cols-2">
                <button
                  onClick={() => setState("reviews")}
                  className={`py-1 hover:text-white px-5 hover:bg-[#4a8477] transition-all duration-300 ${
                    state === "reviews"
                      ? "bg-[#059473] text-white"
                      : "bg-slate-200 text-black"
                  }  `}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setState("description")}
                  className={`py-1 hover:text-white px-5 hover:bg-[#4a8477] transition-all duration-300 ${
                    state === "description"
                      ? "bg-[#059473] text-white"
                      : "bg-slate-200 text-black"
                  }  `}
                >
                  Description
                </button>
              </div>

              <div>
                {state === "reviews" ? (
                  <ProductReviews />
                ) : (
                  <ProductDescription />
                )}
              </div>
            </div>
          </div>
          {/* related products from shop */}
          <div className="w-[28%] md-lg:w-full">
            <div className="pl-4 md-lg:pl-0">
              <div className="px-3 py-2 text-slate-600 bg-slate-200">
                <h2 className="font-bold">From Makro Market</h2>
              </div>
              <div className="flex flex-col md:flex-wrap md:flex-row gap-5 mt-3 border p-3">
                {[1, 2, 3].map((p, i) => {
                  return <Cart />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* related products */}

      <div className="w-[85%] py-4 md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-12">
        <h2 className="text-2xl py-8 text-slate-600">Related Products</h2>
        {/* swiper */}
        <div>
          <Swiper
            slidesPerView="auto"
            breakpoints={{
              1280: {
                slidesPerView: 4,
              },
              565: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={25}
            loop={true}
            pagination={{
              clickable: true,
              el: ".custom_bullet",
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {[1, 2, 3, 4, 5, 6].map((p, i) => {
              return (
                <SwiperSlide key={i}>
                  <Cart />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="w-full flex justify-center items-center pty-10">
          <div className="custom_bullet justify-center !w-auto"></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
