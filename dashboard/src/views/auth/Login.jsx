import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="min-w-screen min-h-screen bg-[#e5e1e1] flex items-center justify-center">
      <div className="w-[350px] text-[#fffFFF] bg-[#52a2bc] p-4 rounded-md">
        <h2 className="text-xl mb-3 font-bold">Login</h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="appearance-none block text-black w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full text-black  px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  color="black"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute  right-2 top-2 cursor-pointer"
                  size={25}
                  color="black"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              Sign in
            </button>
          </div>
          <div className="flex gap-4">
            <h4>Do not have an account?</h4>
            <Link to="/register" className="text-blue-600 pl-2">
              Sign up
            </Link>
          </div>

          <div className="w-full flex justify-center items-center mb-3">
            <div className="w-[45%] bg-slate-700 h-[2px]"></div>
            <div className="w-[10%] flex justify-center items-center ">
              <span className="pb-1"> Or</span>
            </div>
            <div className="w-[45%] bg-slate-700 h-[2px]"></div>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="w-[135px] h-[35px] flex rounded-md bg-orange-500 shadow-lg hover:shadow-orange-600/50 justify-center cursor-pointer items-center overflow-hidden">
              <span>
                <FaGoogle />
              </span>
            </div>
            <div className="w-[135px] h-[35px] flex rounded-md bg-blue-500 shadow-lg hover:shadow-orange-600/50 justify-center cursor-pointer items-center overflow-hidden">
              <span>
                <FaFacebook />
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
