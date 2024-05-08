import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { SiShopee } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const ProfileNav = () => {
  return (
    <div className="w-3/12 md:w-full h-[100%] shadow-lg">
      <div className="py-3 w-full  bg-[#fff] rounded-md">
        <ul className="flex flex-col h-[100%]  md:flex-row justify-between items-start text-slate-600 font-bold ">
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2 transition-all duration-200 ">
            <NavLink
              to="/dashboard"
              className="flex items-center justify-start gap-3 py-1 "
            >
              <span>
                <RxDashboard size={20} />
              </span>
              <span className="md:hidden">Dashboard</span>
            </NavLink>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200 ">
            <NavLink
              to="/dashboard/my-orders"
              className="flex items-center justify-start gap-3 py-1"
            >
              <span>
                <SiShopee size={20} />
              </span>
              <span className="md:hidden">My Orders</span>
            </NavLink>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 transition-all duration-200">
            <NavLink to='/dashboard/my-wishlist' className="flex items-center justify-start gap-3 py-1">
              <span>
                <IoHeartOutline size={20} />
              </span>
              <span className="md:hidden">Wishlist</span>
            </NavLink>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <NavLink to='/dashboard/chat' className="flex items-center justify-start gap-3 py-1">
              <span>
                <IoChatbubblesOutline size={20} />
              </span>
              <span className="md:hidden">Chat</span>
            </NavLink>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <NavLink to='/dashboard/change-password' className="flex items-center justify-start gap-3 py-1">
              <span>
                <FaLock size={20} />
              </span>
              <span className="md:hidden">Change Password</span>
            </NavLink>
          </li>
          <li className="hover:bg-slate-300 w-full px-4 sm:px-2  transition-all duration-200">
            <NavLink className="flex items-center justify-start gap-3 py-1">
              <span>
                <AiOutlineLogout size={20} />
              </span>
              <span className="md:hidden">Log out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNav;
