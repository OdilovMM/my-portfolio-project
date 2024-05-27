import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";

import { FaCartShopping } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { FaUserClock } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = ({ showBar, setShowBar }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (userInfo && userInfo.role === "seller") {

  //   } else {

  //   }
  // }, [userInfo]);
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40 bg-[#fff]">
      <div className="ml-0 lg:ml-[260px] rounded-sm h-[64px]  flex justify-between items-center shadow-xl px-5 transition-all">
        <div
          onClick={() => setShowBar(!showBar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm  shadow-sm hover:shadow-indigo-500/50 justify-center items-center cursor-pointer transition-all duration-400"
        >
          <span>
            <FaBars size={26} />
          </span>
        </div>
        <div className="hidden md:block relative ">
          <input
            type="text"
            name="search"
            placeholder="Search item..."
            className="bg-[#e2dddd] px-3 py-1 outline-none w-[300px] border  rounded-[5px] text-[#A3A6AA] "
            id=""
          />
          <CiSearch
            className="absolute top-[7px] right-1"
            color="#A3A6AA"
            size={22}
          />
        </div>

        {/* notifications */}

        <div className="flex justify-center items-center gap-8 relative">
          <div className="hidden md:block relative ">
            <ul className="flex flex-row gap-0 items-center">
              <li className="relative p-3">
                <Link className="cursor-pointer">
                  <span className="absolute text-[12px] top-0 text-black font-bold right-1 rounded-full flex justify-center items-center">
                    0
                  </span>
                  <FaCartShopping size={22} />
                </Link>
              </li>
              <li className="relative p-3">
                <Link className="cursor-pointer">
                  <span className="absolute text-[12px] top-0 text-black font-bold right-1 rounded-full flex justify-center items-center">
                    3
                  </span>
                  <MdOutlinePayments size={22} />
                </Link>
              </li>
              <li className="relative p-3">
                <Link className="cursor-pointer">
                  <span className="absolute text-[12px] top-0 text-black font-bold right-1 rounded-full flex justify-center items-center">
                    4
                  </span>
                  <FaUserClock size={22} />
                </Link>
              </li>
              <li className="relative p-3">
                <Link className="cursor-pointer">
                  <span className="absolute text-[12px] top-0 text-black font-bold right-1 rounded-full flex justify-center items-center">
                    9
                  </span>
                  <CiMail size={22} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-4">
              <div className="flex justify-center items-center flex-col text-end">
                <h1 className="text-md font-bold">{userInfo?.name}</h1>
                <span className="text-[14px] uppercase w-full font-normal">
                  {userInfo?.role}
                </span>
              </div>
              <div>
                {userInfo.role === "admin" ? (
                  <img
                    src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                    alt=""
                    className="w-[45px] h-[45px] rounded-full overflow-hidden object-cover"
                  />
                ) : (
                  <img
                    src={userInfo.image}
                    alt=""
                    className="w-[45px] h-[45px] rounded-full overflow-hidden object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
