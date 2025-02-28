import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { admin_Login } from "../../store/Reducers/authReducer";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader, userInfo } = useSelector((state) => state.auth);

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
    dispatch(admin_Login(credentials));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/admin/dashboard");
    } else {
      return;
    }
  }, [userInfo, navigate, dispatch]);

  return (
    <div className="min-w-screen min-h-screen bg-[#e5e1e1] flex items-center justify-center">
      <div className="w-[350px] text-[#333] bg-[#a1cbd9] p-7 rounded-md">
        <h2 className="text-[26px] mb-3 font-bold">Login as an Admin</h2>
        <p className="text-[16px] text-red-700 mb-3 font-bold">
          Remember! If you lost credentials, Please contact with developer!
        </p>

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
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
