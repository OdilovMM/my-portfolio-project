import React from "react";

const OrdersDetail = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#3D464D] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#818994] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="">pending</option>
            <option value="">processing</option>
            <option value="">warehouse</option>
            <option value="">placed</option>
            <option value="">cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>#34344</h2>
            <span>3 Feb 2024</span>
          </div>

          <div className="flex flex-wrap">
            {/* left */}
            <div className="w-[30%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">Deliver To : John Doe </h2>
                  <p>
                    <span className="text-sm">
                      454-633 STreet Milla. st Lakatino City, Prance
                    </span>
                  </p>
                </div>

                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status</h2>
                  <span className="text-base">Paid</span>
                </div>

                <span>Price : $844</span>

                <div className="mt-4 flex flex-col gap-4 bg-[#728382ef] rounded-sm">
                  <div className="text-white">
                    <div className="flex gap-3 text-medium">
                      <img
                        className="w-[54px] h-[54px]"
                        src="http://localhost:3000/images/category/1.jpg"
                        alt=""
                      />
                      <div className="">
                        <h2>Product Name :</h2>
                        <p>
                          <span>Brand:</span>
                          <span> HotSHop </span>
                          <span> Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-4 bg-[#728382ef] rounded-sm">
                  <div className="text-white">
                    <div className="flex gap-3 text-medium">
                      <img
                        className="w-[54px] h-[54px]"
                        src="http://localhost:3000/images/category/1.jpg"
                        alt=""
                      />
                      <div className="">
                        <h2>Product Name :</h2>
                        <p>
                          <span>Brand:</span>
                          <span> HotSHop </span>
                          <span> Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-4 bg-[#728382ef] rounded-sm">
                  <div className="text-white">
                    <div className="flex gap-3 text-medium">
                      <img
                        className="w-[54px] h-[54px]"
                        src="http://localhost:3000/images/category/1.jpg"
                        alt=""
                      />
                      <div className="">
                        <h2>Product Name :</h2>
                        <p>
                          <span>Brand:</span>
                          <span> HotSHop </span>
                          <span> Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* right */}

            <dir className="w-[70%]">
              <div className="pl-3">
                <div className="mt-4 flex flex-col bg-[#8eafac84] rounded-md p-3">
                  <div className="text-white">
                    <div className="flex justify-start items-center gap-3">
                      <h2>Seller 1 order:</h2>
                      <span>Pending</span>
                    </div>
                    <div className="mt-4 flex flex-col gap-4 bg-[#728382ef] rounded-sm">
                      <div className="text-white">
                        <div className="flex gap-3 text-medium mt-2">
                          <img
                            className="w-[54px] h-[54px]"
                            src="http://localhost:3000/images/category/1.jpg"
                            alt=""
                          />
                          <div className="">
                            <h2>Product Name :</h2>
                            <p>
                              <span>Brand:</span>
                              <span> HotSHop </span>
                              <span> Quantity: 3</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-white">
                    <div className="flex justify-start items-center gap-3 mt-2">
                      <h2>Seller 1 order:</h2>
                      <span>Pending</span>
                    </div>
                    <div className="mt-4 flex flex-col gap-4 bg-[#728382ef] rounded-sm">
                      <div className="text-white">
                        <div className="flex gap-3 text-medium ">
                          <img
                            className="w-[54px] h-[54px]"
                            src="http://localhost:3000/images/category/1.jpg"
                            alt=""
                          />
                          <div className="">
                            <h2>Product Name :</h2>
                            <p>
                              <span>Brand:</span>
                              <span> HotSHop </span>
                              <span> Quantity: 3</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </dir>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetail;
