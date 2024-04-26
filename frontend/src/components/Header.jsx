import React from "react";
import { IoIosMail, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdAddIcCall, MdFacebook } from "react-icons/md";
import {
  FaTelegram,
  FaUserCircle,
  FaLinkedin,
  FaGithub,
  FaLock,
} from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  const user = true;

  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-black">
            <ul className="flex justify-start items-center gap-6 font-semibold text-black">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <IoIosMail size={18} />
                </span>
                <span>xolmurododilov@gmail.com</span>
              </li>
              <li className="flex relative justify-center items-center gap-2 text-sm ">
                <span>
                  <MdAddIcCall size={18} />
                </span>
                <span>+(998) 90 532 99 14</span>
              </li>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-8">
                <div className="flex justify-center items-center gap-4 text-black">
                  <Link>
                    <MdFacebook size={18} />
                  </Link>
                  <Link>
                    <FaTelegram size={18} />
                  </Link>
                  <Link>
                    <FaLinkedin size={18} />
                  </Link>
                  <Link>
                    <FaGithub size={18} />
                  </Link>
                </div>
                {/* language */}
                <div className="flex group cursor-pointer text-slate-600 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <IoLanguageSharp size={18} />
                  <span>
                    <IoIosArrowDown />
                  </span>

                  <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[75px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-[#8eaebb] z-10">
                    <li>Uzb</li>
                    <li>Eng</li>
                    <li>Kor</li>
                  </ul>
                </div>

                {user ? (
                  <>
                    <Link
                      className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                      to="/dashboard"
                    >
                      <span>
                        {" "}
                        <FaUserCircle />{" "}
                      </span>
                      <span>Madamin</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                      to="/dashboard"
                    >
                      <span>
                        {" "}
                        <FaLock />{" "}
                      </span>
                      <span>Login</span>
                    </Link>
                  </>
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
