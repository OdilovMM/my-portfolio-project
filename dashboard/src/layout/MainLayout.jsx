import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../utils/utils";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  useEffect(() => {
    if (userInfo && userInfo.role === "seller") {
      //
      socket.emit("addSeller", userInfo._id, userInfo);
    } else {
      //
      socket.emit("addAdmin", userInfo);
    }
  }, [userInfo]);

  const [showBar, setShowBar] = useState(false);

  return (
    <div className="bg-[#fff] w-full min-h-screen">
      <Header showBar={showBar} setShowBar={setShowBar} />
      <Sidebar showBar={showBar} setShowBar={setShowBar} />
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
