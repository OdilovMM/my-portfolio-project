import React, { useEffect } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDashboardIndexData } from "../../store/reducers/dashboardReducer";

const HomeProfile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.customerAuth);
  const { recentOrders, totalOrder, pendingOrder, cancelledOrder } =
    useSelector((state) => state.dashboard);
  console.log(userInfo.id);

  useEffect(() => {
    dispatch(getDashboardIndexData(userInfo.id));
  }, [dispatch, userInfo.id]);

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="group flex shadow-lg justify-normal items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px]  h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Total Orders</span>
          </div>
        </div>
        <div className="flex shadow-lg justify-normal items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders</span>
          </div>
        </div>
        <div className="flex shadow-lg justify-normal items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Canceled Orders</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg p-5 mt-5 rounded-md">
        <h2 className="font-semibold">Recent 5 Orders</h2>
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
                {recentOrders.map((recent, ind) => {
                  return (
                    <tr key={ind} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium whitespace-normal">
                       #{recent._id}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-normal">
                        $ {recent.price}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-normal">
                        {recent.paymentStatus}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-normal">
                        {recent.deliveryStatus}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProfile;
