import React, { useState } from "react";
import { FaList } from "react-icons/fa6";

const SellerAdminChat = () => {
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#3D464D] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className="w-full  md:pl-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <div className="relative">
                  <img
                    src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                    className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                    alt=""
                  />

                  <div className="w-[10px] h-[10px] bg-green-500  rounded-full absolute right-0 bottom-0"></div>
                </div>
                <h2 className="text-white">Support</h2>
              </div>

              <div className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500 justify-center cursor-pointer items-center text-white">
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#8c9a9ceb] h-[calc(100vh-290px)] rounded-[5px] p-3 overflow-y-auto">
                {/* Left */}
                <div className="w-full flex justify-start items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                        className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start  flex-col w-full bg-blue-300 text-white py-1 px-2 rounded-sm">
                      <span>Hello there Admin, Are you her???</span>
                    </div>
                  </div>
                </div>

                {/* right */}
                <div className="w-full flex justify-end items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div className="flex justify-center items-start  flex-col w-full bg-blue-600 text-white py-1 px-2 rounded-sm">
                      <span>Hi??? How Can i help uu??</span>
                    </div>

                    <div>
                      <img
                        src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                        className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {/* left */}

                <div className="w-full flex justify-start items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                        className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start  flex-col w-full bg-blue-300 text-white py-1 px-2 rounded-sm">
                      <span>
                        I need some instructions about the Admin panel
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form className="flex gap-3">
              <input
                type="text"
                className="w-full flex justify-between px-2 border rounded-[5px] border-slate-700 items-center py-[5px] outline-none bg-[#85a8ac83]"
                placeholder="Type your text"
              />
              <button className="shadow-lg bg-green-600 px-4 py-2 h-[36px] rounded-sm">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAdminChat;
