import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { BreadCrumbs } from "../components";

const ShippingPage = () => {
  const cartProducts = [1, 2];
  const [shipData, setShipData] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    state: "",
    city: "",
    building: "",
  });
  const [result, setResult] = useState(false);

  const handleInput = (e) => {
    setShipData({
      ...shipData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, address, phone, post, state, city, building } = shipData;

    if (name && address && phone && post && state && city && building) {
      setResult(true);
    }
  };

  return (
    <>
      <div className="bg-[url('http://localhost:3000/images/banner/shop.png')]  h-[220px] mt-6 bg-cover bg-no-repeat bg-left">
        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-black">
          <h2 className="text-3xl font-bold">Shipping Page</h2>
          <div className="flex justify-center items-center gap-2 text-2xl w-full">
            <BreadCrumbs
              from="/my-cart"
              fromPage="My Cart"
              to="/shipping"
              iconSize={27}
              toPage="Shipping"
              iconColor="black"
            />
          </div>
        </div>
      </div>

      {/* main */}

      <div className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3">
                    Shipping Information{" "}
                  </h2>

                  {!result && (
                    <>
                      <form onSubmit={handleSubmitForm}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name"> Name </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="name"
                              onChange={handleInput}
                              value={shipData.name}
                              id="name"
                              placeholder="Name"
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address"> Address </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="address"
                              id="address"
                              onChange={handleInput}
                              value={shipData.address}
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone"> Phone </label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="phone"
                              id="phone"
                              placeholder="Phone"
                              onChange={handleInput}
                              value={shipData.phone}
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post"> Post </label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="post"
                              id="post"
                              placeholder="post"
                              onChange={handleInput}
                              value={shipData.post}
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="state"> State </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="state"
                              id="state"
                              placeholder="State"
                              onChange={handleInput}
                              value={shipData.state}
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city"> City </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="city"
                              id="city"
                              placeholder="City"
                              onChange={handleInput}
                              value={shipData.city}
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="building"> Building </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="building"
                              id="building"
                              placeholder="Building"
                              onChange={handleInput}
                              value={shipData.building}
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <button className="w-full px-3 py-2 border text-white bg-slate-400 mt-7 border-slate-200 outline-none focus:border-green-500 rounded-md">
                              save
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {result && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-slate-600 font-semibold pb-2">
                        Deliver To
                      </h2>
                      <p>
                        <span className="bg-blue-300 text-blue-700 text-sm font-medium mr-2 px-2 py-1 rounded-md">
                          Home
                        </span>
                        <div className="flex flex-col">
                          <span>Name: {shipData.name} </span>
                          <span>Address: {shipData.address} </span>
                          <span>Phone: {shipData.phone} </span>
                          <span>Post: {shipData.post} </span>
                          <span>State: {shipData.state} </span>
                          <span>City: {shipData.city} </span>
                          <span>Building: {shipData.building} </span>
                        </div>
                        <span
                          onClick={() => setResult(false)}
                          className=" text-blue-700 text-sm font-medium  cursor-pointer"
                        >
                          Change
                        </span>
                      </p>
                      <p className="text-slate-600 text-sm">
                        Email To xolmurododilov@gmail.com
                      </p>
                    </div>
                  )}
                </div>
                {cartProducts.map((pr, ind) => (
                  <div key={ind} className="flex bg-white p-4 flex-col gap-2">
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
                            <h2 className="text-lg text-orange-500">$240</h2>
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
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                {cartProducts.length > 0 && (
                  <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                    <div className="flex justify-between items-center">
                      <span>Total Items (6) </span>
                      <span>$343 </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Delivery Fee </span>
                      <span>$40 </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Total </span>
                      <span>$2240 </span>
                    </div>

                    {result ? (
                      <button className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-slate-400 text-sm text-white uppercase ">
                        Place order
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
