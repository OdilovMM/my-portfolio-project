import React from "react";

const SellerDetail = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3 text-[#fff] ">
        {" "}
        Seller Details{" "}
      </h1>
      <div className="w-full p-4 bg-[#3D464D] rounded-md">
        <div className="w-full flex flex-wrap text-[#fff]">
          <div className="w-3/12 flex justify-center items-center py-3">
            <div>
              <img
                className="w-full h-[230px]"
                src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                alt=""
              />
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Basic Info</h2>
              </div>

              <div className="flex justify-between text-[#fff] text-sm flex-col gap-2 p-4 bg-[#616b72] rounded-md">
                <div className="flex gap-2 font-bold text-[#fff]">
                  <span>Name : </span>
                  <span>John Doe </span>
                </div>
                <div className="flex gap-2 font-bold ">
                  <span>Email : </span>
                  <span>johndoe@gmail.com </span>
                </div>

                <div className="flex gap-2 font-bold ">
                  <span>Role : </span>
                  <span>Seller </span>
                </div>
                <div className="flex gap-2 font-bold ">
                  <span>Status : </span>
                  <span>Active </span>
                </div>
                <div className="flex gap-2 font-bold ]">
                  <span>Payment Status : </span>
                  <span>Active </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Address</h2>
              </div>

              <div className="flex justify-between text-[#fff] text-sm flex-col gap-2 p-4 bg-[#616b72] rounded-md">
                <div className="flex gap-2 font-bold text-[#fff]">
                  <span>Shop Name : </span>
                  <span>MakroMarket </span>
                </div>
                <div className="flex gap-2 font-bold ">
                  <span>Division : </span>
                  <span>Fergana </span>
                </div>

                <div className="flex gap-2 font-bold ">
                  <span>District : </span>
                  <span>Fergana </span>
                </div>
                <div className="flex gap-2 font-bold ">
                  <span>State : </span>
                  <span>Uzbekistan </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form>
            <div className="flex gap-4 py-3">
              <select
                className="px-4 py-2 focus:border-[#3D464D] outline-none bg-[#5c666e] border border-slate-700 rounded-md text-[#d0d2d6]"
                name=""
                id=""
              >
                <option value="">--Select Status--</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
              <button className="bg-[#4c9ddc] w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetail;
