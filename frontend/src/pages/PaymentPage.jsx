import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { StripePayment } from "../components";

const PaymentPage = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  console.log(price, items, orderId);
  console.log(items)
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <div>
      <div className="bg-[#eeeeee] h-[55vh]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 ">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/stripe.png"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-600">Stripe</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cash")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "cash" ? "bg-white" : "bg-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/cod.jpg"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-600">Cash</span>
                  </div>
                </div>
              </div>

              <div>
                {paymentMethod === "stripe" && (
                  <div>
                    <StripePayment />
                  </div>
                )}
                {paymentMethod === "cash" && (
                  <div className="w-full px-4 py-9 bg-white shadow-md">
                    <button className="px-10 py-3 rounded-sm hover:shadow-md bg-slate-300">
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow-md p-5 text-slate-800 flex flex-col gap-3">
                  <h2>Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} Items and Shipping Fee Included </span>
                    <span>${price} </span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount </span>
                    <span className="text-lg text-green-600">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
