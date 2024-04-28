import React from "react";
import { BreadCrumbs } from "../components";
import { Link, useNavigate } from "react-router-dom";

const AddedProductCart = () => {
  const navigate = useNavigate();
  const cartProducts = [1, 2];
  const outOfStock = [1, 2, 3];

  const redirect = () => {
    navigate("/shipping", {
      shippedData: {
        products: [],
        price: 500,
        shippingFee: 120,
        items: 2,
      },
    });
  };

  return (
    <>
      {/* BreadCrumbs */}
      <div className="bg-[url('http://localhost:3000/images/banner/shop.png')]  h-[220px] mt-6 bg-cover bg-no-repeat bg-left">
        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-black">
          <h2 className="text-3xl font-bold">My Cart Page</h2>
          <div className="flex justify-center items-center gap-2 text-2xl w-full">
            <BreadCrumbs
              from="/"
              fromPage="Home"
              to="/my-cart"
              iconSize={27}
              toPage="My Cart"
              iconColor="black"
            />
          </div>
        </div>
      </div>

      {/* main */}

      <div className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-14">
          {cartProducts.length > 0 || outOfStock > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-red-500 font-semibold">
                        Stock Products in {cartProducts.length}
                      </h2>
                    </div>

                    {cartProducts.map((pr, ind) => (
                      <div
                        key={ind}
                        className="flex bg-white p-4 flex-col gap-2"
                      >
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 font-bold">
                            Makro Market
                          </h2>
                        </div>

                        {[1, 2].map((product, index) => (
                          <div key={index} className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={`http://localhost:3000/images/products/${
                                    index + 1
                                  }.webp`}
                                  alt=""
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md font-semibold">
                                    Product Name
                                  </h2>
                                  <span className="text-sm">Brand: Zara</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  $240
                                </h2>
                                <p className="line-through">$300</p>
                                <p>-15%</p>
                              </div>

                              {/* increment */}
                              <div className="flex gap-2 flex-col">
                                <div className="flex  h-[30px] gap-1 justify-center items-start text-xl">
                                  <button className="px-6 bg-slate-400 cursor-pointer">
                                    -
                                  </button>
                                  <span className="px-3 bg-slate-400 ">3</span>
                                  <button className="px-6 bg-slate-400 cursor-pointer">
                                    +
                                  </button>
                                </div>
                                <button className="px-12 bg-slate-400">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {outOfStock.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-white p-4">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out of Stock {cartProducts.length}
                          </h2>
                        </div>

                        <div className="bg-white p-4">
                          {[1].map((product, index) => (
                            <div key={index} className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={`http://localhost:3000/images/products/${
                                      index + 1
                                    }.webp`}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md font-semibold">
                                      Product Name
                                    </h2>
                                    <span className="text-sm">Brand: Zara</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    $240
                                  </h2>
                                  <p className="line-through">$300</p>
                                  <p>-15%</p>
                                </div>

                                {/* increment */}
                                <div className="flex gap-2 flex-col">
                                  <div className="flex  h-[30px] gap-1 justify-center items-start text-xl">
                                    <button className="px-6 bg-slate-400  cursor-not-allowed">
                                      -
                                    </button>
                                    <span className="px-3 bg-slate-400 ">
                                      3
                                    </span>
                                    <button className="px-6 bg-slate-400  cursor-not-allowed">
                                      +
                                    </button>
                                  </div>
                                  <button className="px-12 bg-slate-400">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cartProducts.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span>2 Items </span>
                        <span>$343 </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee </span>
                        <span>$40 </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-lg text-[#059473]">$430 </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-slate-400 text-sm text-white uppercase "
                      >
                        Process to Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 bg-slate-400 text-black" to="/shop">
                Buy now
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddedProductCart;
