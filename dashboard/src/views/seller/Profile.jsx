import React from "react";
import { FaImages } from "react-icons/fa6";
import { FadeLoader } from "react-spinners";
import { FaPenNib } from "react-icons/fa";

const Profile = () => {
  const image = true;
  const loader = true;
  const status = "active";
  const userDetail = true;

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#3D464D] rounded-md text-[#d0d2d6]">
            <div className="flex justify-center items-center py-3">
              {image ? (
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img
                    src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                    alt=""
                  />
                  {!loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImages />{" "}
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input type="file" name="" className="hidden" id="img" />
            </div>

            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 bg-[#54595d] p-4 rounded-[5px] relative ">
                <span className="p-[5px] bg-white rounded absolute right-2 top-2 cursor-pointer">
                  <FaPenNib color="black" />
                </span>
                <div className="flex gap-2 ">
                  <span className="font-bold">Name:</span>
                  <span>Odilov Madamin</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-bold">Email:</span>
                  <span>xolmurododilov@gmail.com</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-bold">Role:</span>
                  <span className="capitalize">seller</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-bold">Status:</span>
                  <span className="capitalize">Active</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-bold">Payment Account:</span>
                  <p className="bg-slate-400 rounded-md px-2 cursor-pointer">
                    {status === "active" ? (
                      <span className="capitalize">pending</span>
                    ) : (
                      <span className="capitalize">click active</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-0 md:px-5 py-2">
              {!userDetail ? (
                <form>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="Shop">Shop name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Shop name"
                      className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="Division">Division name</label>
                    <input
                      type="text"
                      name="division"
                      id="division"
                      placeholder="Department name"
                      className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="District">District name:</label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      placeholder="District name"
                      className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="Sub">Sub District</label>
                    <input
                      type="text"
                      name="sub"
                      id="sub"
                      placeholder="Sub District"
                      className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                    />
                  </div>

                  <div className="flex">
                    <button className="bg-[#94A3B8] w-[250px] py-2 mt-3 rounded-[5px]">
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 bg-[#54595d] p-4 rounded-[5px] relative ">
                  <span className="p-[5px] bg-white rounded absolute right-2 top-2 cursor-pointer">
                    <FaPenNib color="black" />
                  </span>
                  <div className="flex gap-2 ">
                    <span className="font-bold">Shop Name:</span>
                    <span>Odilov Madamin</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-bold">Division name:</span>
                    <span>xolmurododilov@gmail.com</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-bold">District name:</span>
                    <span className="capitalize">seller</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-bold">Sub District:</span>
                    <span className="capitalize">Active</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12">
          <div className="w-full  pl-0 md:pl-7 ">
            <div className="bg-[#3D464D] rounded-md p-6 text-white">
              <h2 className="font-semibold text-lg">Change password</h2>
              <form>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="password">Old Password</label>
                  <input
                    type="password"
                    name="old-password"
                    id="old-password"
                    placeholder="Old Password"
                    className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="new-password">New Password</label>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    placeholder="New password"
                    className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                  />
                </div>

                <div className="flex">
                  <button className="bg-[#94A3B8] w-[250px] py-2 mt-3 rounded-[5px]">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
