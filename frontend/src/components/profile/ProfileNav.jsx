import React from "react";
import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { SiShopee } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const ProfileNav = () => {
  return (
    <div className="w-3/12 md:w-full    bg-[#fff] rounded-md shadow-lg ">
      <div className="py-3 w-full ">
        <ul className="flex flex-col md:flex-row justify-between items-start text-slate-600 font-bold ">
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2 transition-all duration-200">
            <Link className="flex items-center justify-start gap-3 py-1">
              <span>
                <RxDashboard size={20} />
              </span>
              <span className="md:hidden">Dashboard</span>
            </Link>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <Link className="flex items-center justify-start gap-3 py-1">
              <span>
                <SiShopee size={20} />
              </span>
              <span className="md:hidden">My Orders</span>
            </Link>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 transition-all duration-200">
            <Link className="flex items-center justify-start gap-3 py-1">
              <span>
                <IoHeartOutline size={20} />
              </span>
              <span className="md:hidden">Wishlist</span>
            </Link>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <Link className="flex items-center justify-start gap-3 py-1">
              <span>
                <IoChatbubblesOutline size={20} />
              </span>
              <span className="md:hidden">Support</span>
            </Link>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <Link className="flex items-center justify-start gap-3 py-1">
              <span>
                <FaLock size={20} />
              </span>
              <span className="md:hidden">Change Password</span>
            </Link>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <Link className="flex items-center justify-start gap-3 py-1">
              <span>
                <AiOutlineLogout size={20} />
              </span>
              <span className="md:hidden">Change Password</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNav;
