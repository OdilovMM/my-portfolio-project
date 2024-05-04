import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyOrderPage = () => {
  const [state, setState] = useState("all");
  return (
    <div>
      <div className="bg-white shadow-lg p-5 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">My Orders</h2>
          <select
            name=""
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="outline-none px-3 py-1 border rounded-md bg-red-200"
            id=""
          >
            <option value="all">All Orders</option>
            <option value="placed">Placed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>
        <div className="pt-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-md">
                <tr className="rounded-md">
                  <th scope="col" className=" px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    Order Status
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    #36514
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    $ 1236
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal flex flex-row gap-2">
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      View
                    </Link>
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      Pay Now
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    #36514
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    $ 1236
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Paid
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal flex flex-row gap-2">
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      View
                    </Link>
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      Pay Now
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    #36514
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    $ 1236
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal flex flex-row gap-2">
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      View
                    </Link>
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      Pay Now
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    #36514
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    $ 1236
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Paid
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal flex flex-row gap-2">
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      View
                    </Link>
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      Pay Now
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    #36514
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    $ 1236
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal flex flex-row gap-2">
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      View
                    </Link>
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      Pay Now
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    #36514
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    $ 1236
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Paid
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal flex flex-row gap-2">
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      View
                    </Link>
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      Pay Now
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    #36514
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    $ 1236
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal flex flex-row gap-2">
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      View
                    </Link>
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      Pay Now
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    #36514
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    $ 1236
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Paid
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal">
                    Pending
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-normal flex flex-row gap-2">
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      View
                    </Link>
                    <Link className="px-3 py-[2px] rounded-md bg-slate-300">
                      Pay Now
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderPage;
