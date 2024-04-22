import React, { forwardRef } from "react";
import { LuTimer } from "react-icons/lu";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {}

const outerElType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Row = ({ index, style }) => {
  return (
    <div style={style} className="flex text-sm">
      <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
        {index + 1}
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
        $5{index + 1}5{index + 1}
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap">
        <span className="px-3 py-1 bg-[#6e7376] text-[#fff] rounded-[3px]">
          Pending
        </span>
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
        {" "}
        12 Apr 2024{" "}
      </div>
    </div>
  );
};

const Payments = () => {
  return (
    <div className="px-2 md:px-7 py-5 ">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
        <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#dfcbcb] rounded-md gap-3">
          <div className="flex flex-col justify-start  items-start text-[#333]">
            <h2 className="text-3xl font-semibold">$1900</h2>
            <span className="text-md font-semibold">Total Sales</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full justify-center items-center">
            <MdOutlineCurrencyExchange size={45} />
          </div>
        </div>
        <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#dfcbcb] rounded-md gap-3">
          <div className="flex flex-col justify-start  items-start text-[#333]">
            <h2 className="text-3xl font-semibold">1950</h2>
            <span className="text-md font-semibold">Available Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
            <GiCash size={45} />
          </div>
        </div>
        <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#dfcbcb] rounded-md gap-3">
          <div className="flex flex-col justify-start  items-start text-[#333]">
            <h2 className="text-3xl font-semibold">36</h2>
            <span className="text-md font-semibold">Withdrawal Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
            <BiMoneyWithdraw size={45} />
          </div>
        </div>
        <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#dfcbcb] rounded-md gap-3">
          <div className="flex flex-col justify-start  items-start text-[#333]">
            <h2 className="text-3xl font-semibold">9</h2>
            <span className="text-md font-semibold">Pending Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
            <LuTimer size={45} />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
        <div className="bg-[#3D464D] text-white rounded-[5px] p-5">
          <h1 className="text-lg">Send Request</h1>
          <div className="pt-5 mb-4">
            <form>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="number"
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333] md:w-[80%]"
                  name="amount"
                  min="0"
                />
                <button className="bg-[#94A3B8] w-[17%] py-2 px-2 rounded-[5px]">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="pb-4 text-lg">Pending Request</h2>

            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#65727a] uppercase text-[#fff] text-xs font-bold min-w-[340px] rounded-md">
                <div className="w-[25%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[25%] p-2"> Status </div>
                <div className="w-[25%] p-2"> Date </div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List"
                  height={350}
                  itemCount={20}
                  itemSize={35}
                  outerElementType={outerElType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
        <div className="bg-[#3D464D] text-white rounded-[5px] p-5">
          <h1 className="text-lg mb-5">Successful Withdraw</h1>

          <div>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#65727a] uppercase text-[#fff] text-xs font-bold min-w-[340px] rounded-md">
                <div className="w-[25%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[25%] p-2"> Status </div>
                <div className="w-[25%] p-2"> Date </div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List"
                  height={440}
                  itemCount={20}
                  itemSize={35}
                  outerElementType={outerElType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
