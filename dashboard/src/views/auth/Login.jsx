import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { seller_login } from "../../store/Reducers/authReducer";

const Login = () => {
  
  const navigate = useNavigate();
  const { loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    console.log(credentials);
    dispatch(seller_login(credentials));
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#e5e1e1] flex items-center justify-center">
      <div className="w-[350px] text-[#fffFFF] bg-[#a1cbd9] p-7 rounded-md">
        <h2 className="text-xl mb-3 font-bold">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmitData}>
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
                value={credentials.email}
                onChange={handleInput}
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
                value={credentials.password}
                onChange={handleInput}
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
              disabled={loader ? true : false}
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              {loader ? (
                <ScaleLoader color="#fff" height={22} width={5} radius={2} />
              ) : (
                "Sign in"
              )}
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
