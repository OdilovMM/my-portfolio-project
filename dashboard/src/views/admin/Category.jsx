import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { FaPenNib } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Search from "../components/Search";

const Category = () => {
  const [parPage, setParPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-5 bg-[#3D464D] rounded-[5px]">
        <h1 className="text-white">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-[#94A3B8] px-3 rounded-[5px] py-1"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#3D464D] rounded-md">
            <Search
              setParPage={setParPage}
              setSearch={setSearch}
              search={search}
            />

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-[#d0d2d6]">
                <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Image
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[1, 2, 3, 4, 5].map((d, i) => (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {d}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={`http://localhost:3000/images/category/${d}.jpg`}
                          alt=""
                        />
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        T-Shirt
                      </td>

                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex flex-start items-center gap-4">
                          <Link className="px-[6px] cursor-pointer">
                            <FaPenNib />
                          </Link>
                          <button>
                            <MdAutoDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500 `}
        >
          <div className="w-full pl-5">
            <div className="bg-[#3D464D] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center ">
                  Add Category
                </h1>
                <div
                  className="block lg:hidden mb-2"
                  onClick={() => setShow(false)}
                >
                  <IoMdClose size={24} />
                </div>
              </div>

              <form>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name"> Category Name</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#333]"
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Category Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer  border border-dashed w-full "
                  >
                    <span>
                      <MdOutlineAddPhotoAlternate size={45} />
                    </span>
                    <span>Select Image</span>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div>
                    <button className="bg-[#94A3B8] w-full py-2 mt-1 rounded-[5px]">
                      Add Category
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
