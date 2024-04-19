import React, { useState } from "react";
import { IoEyedropOutline } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";

import { Link } from "react-router-dom";
import Pagination from "./Pagination";
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(5);

  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#3D464D] rounded-[5px] ">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setPages(e.target.value)}
            className="px-4 py-2 hover:border-indigo-400 outline-none bg-slate-400 border border-slate-600 rounded-md text-[#fff] "
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <input
            type="text"
            name="search"
            className="bg-[#E2DDDD] px-4 py-1 focus:border-indigo-400 outline-none"
            placeholder="search"
          />
        </div>

        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left bg-[#475159]">
            <div className="text-sm text-[#fff] uppercase border-b border-slate-500 ">
              <div className="flex justify-between items-center">
                <div className="py-3 w-[25%] font-bold ">Order ID</div>
                <div className="py-3 w-[14%] font-bold ">PRICE</div>
                <div className="py-3 w-[19%] font-bold ">Payment Status</div>
                <div className="py-3 w-[19%] font-bold ">Order status</div>
                <div className="py-3 w-[19%] font-bold ">Action</div>
                <div className="py-3 w-[9%] font-bold "></div>
              </div>
            </div>
          </div>
        </div>

        <div className=" text-[#fff]  ">
          <div className="flex justify-between items-start border-b border-slate-600">
            <div className="py-3 w-[25%] font-medium whitespace-nowrap ">
              #545464984
            </div>
            <div className="py-3 w-[14%] font-medium ">$265</div>
            <div className="py-3 w-[19%] font-medium ">Pending</div>
            <div className="py-3 w-[19%] font-medium ">Pending</div>
            <div className="py-3 w-[19%] font-medium ">
              <Link to='/admin/dashboard/order/details/3'>View</Link>
            </div>
            <div
              onClick={(e) => setShow(!show)}
              className="py-3 w-[9%] font-medium "
            >
              <BiCommentDetail
                size={16}
                color="white"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div
            className={
              show ? "block border-b border-slate-500 bg-slate-700" : "hidden"
            }
          >
            <div className="flex justify-start items-start border-b border-slate-700">
              <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                #543246494
              </div>
              <div className="py-3 w-[13%] font-medium ">$26435</div>
              <div className="py-3 w-[18%] font-medium ">Pending</div>
              <div className="py-3 w-[19%] font-medium ">Pending</div>
            </div>

            <div className="flex justify-start items-start border-b border-slate-700">
              <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                #543246494
              </div>
              <div className="py-3 w-[13%] font-medium ">$26435</div>
              <div className="py-3 w-[18%] font-medium ">Pending</div>
              <div className="py-3 w-[19%] font-medium ">Pending</div>
            </div>
          </div>
        </div>
        <div className=" text-[#fff]  ">
          <div className="flex justify-between items-start border-b border-slate-600">
            <div className="py-3 w-[25%] font-medium whitespace-nowrap ">
              #545464984
            </div>
            <div className="py-3 w-[14%] font-medium ">$265</div>
            <div className="py-3 w-[19%] font-medium ">Pending</div>
            <div className="py-3 w-[19%] font-medium ">Pending</div>
            <div className="py-3 w-[19%] font-medium ">
              <Link>View</Link>
            </div>
            <div
              onClick={(e) => setShow(!show)}
              className="py-3 w-[9%] font-medium "
            >
              <BiCommentDetail
                size={16}
                color="white"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div
            className={
              show ? "block border-b border-slate-500 bg-slate-700" : "hidden"
            }
          >
            <div className="flex justify-start items-start border-b border-slate-700">
              <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                #543246494
              </div>
              <div className="py-3 w-[13%] font-medium ">$26435</div>
              <div className="py-3 w-[18%] font-medium ">Pending</div>
              <div className="py-3 w-[19%] font-medium ">Pending</div>
            </div>

            <div className="flex justify-start items-start border-b border-slate-700">
              <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                #543246494
              </div>
              <div className="py-3 w-[13%] font-medium ">$26435</div>
              <div className="py-3 w-[18%] font-medium ">Pending</div>
              <div className="py-3 w-[19%] font-medium ">Pending</div>
            </div>
          </div>
        </div>
        <div className=" text-[#fff]  ">
          <div className="flex justify-between items-start border-b border-slate-600">
            <div className="py-3 w-[25%] font-medium whitespace-nowrap ">
              #545464984
            </div>
            <div className="py-3 w-[14%] font-medium ">$265</div>
            <div className="py-3 w-[19%] font-medium ">Pending</div>
            <div className="py-3 w-[19%] font-medium ">Pending</div>
            <div className="py-3 w-[19%] font-medium ">
              <Link>View</Link>
            </div>
            <div
              onClick={(e) => setShow(!show)}
              className="py-3 w-[9%] font-medium "
            >
              <BiCommentDetail
                size={16}
                color="white"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div
            className={
              show ? "block border-b border-slate-500 bg-slate-700" : "hidden"
            }
          >
            <div className="flex justify-start items-start border-b border-slate-700">
              <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                #543246494
              </div>
              <div className="py-3 w-[13%] font-medium ">$26435</div>
              <div className="py-3 w-[18%] font-medium ">Pending</div>
              <div className="py-3 w-[19%] font-medium ">Pending</div>
            </div>

            <div className="flex justify-start items-start border-b border-slate-700">
              <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                #543246494
              </div>
              <div className="py-3 w-[13%] font-medium ">$26435</div>
              <div className="py-3 w-[18%] font-medium ">Pending</div>
              <div className="py-3 w-[19%] font-medium ">Pending</div>
            </div>
          </div>
        </div>
        <div className=" text-[#fff]  ">
          <div className="flex justify-between items-start border-b border-slate-600">
            <div className="py-3 w-[25%] font-medium whitespace-nowrap ">
              #545464984
            </div>
            <div className="py-3 w-[14%] font-medium ">$265</div>
            <div className="py-3 w-[19%] font-medium ">Pending</div>
            <div className="py-3 w-[19%] font-medium ">Pending</div>
            <div className="py-3 w-[19%] font-medium ">
              <Link>View</Link>
            </div>
            <div
              onClick={(e) => setShow(!show)}
              className="py-3 w-[9%] font-medium "
            >
              <BiCommentDetail
                size={16}
                color="white"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div
            className={
              show ? "block border-b border-slate-500 bg-slate-700" : "hidden"
            }
          >
            <div className="flex justify-start items-start border-b border-slate-700">
              <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                #543246494
              </div>
              <div className="py-3 w-[13%] font-medium ">$26435</div>
              <div className="py-3 w-[18%] font-medium ">Pending</div>
              <div className="py-3 w-[19%] font-medium ">Pending</div>
            </div>

            <div className="flex justify-start items-start border-b border-slate-700">
              <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                #543246494
              </div>
              <div className="py-3 w-[13%] font-medium ">$26435</div>
              <div className="py-3 w-[18%] font-medium ">Pending</div>
              <div className="py-3 w-[19%] font-medium ">Pending</div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="w-full justify-end flex mt-1 bottom-1 right-2">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            pages={pages}
            showItem={2}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
