import React, { useState } from "react";
import { IoEyedropOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";

import { Link } from "react-router-dom";
import Pagination from "../admin/Pagination";
import Search from "../components/Search";

const SellerOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(5);
  const [parPage, setParPage] = useState(5);

  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-black mb-2">View All Orders</h1>
      <div className="w-full p-4 bg-[#3D464D] rounded-[5px] ">
        <Search setParPage={setParPage} setSearch={setSearch} search={search} />

        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left bg-[#475159]">
            <div className="text-sm text-[#fff] uppercase border-b border-slate-500 ">
              <div className="flex justify-between items-center">
                <div className="py-3 w-[25%] font-bold ">Order ID</div>
                <div className="py-3 w-[14%] font-bold ">PRICE</div>
                <div className="py-3 w-[19%] font-bold ">Payment Status</div>
                <div className="py-3 w-[19%] font-bold ">Order status</div>
                <div className="py-3 w-[19%] font-bold ">Action</div>
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
              <Link to="/seller/dashboard/orders/details/3">
                <LuEye size={20} />
              </Link>
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
              <Link>
                <LuEye size={20} />
              </Link>
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
              <Link to={`/seller/dashboard/orders/details/25`}>
                <LuEye size={20} />
              </Link>
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
              <Link>
                <LuEye size={20} />
              </Link>
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

export default SellerOrders;
