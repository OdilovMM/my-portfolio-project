import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {}

const outerElType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentReq = () => {
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 7, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41,
  ];

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
          {index + 1}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">$5{index + 1}5{index + 1}5</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="px-3 py-1 bg-[#6e7376] text-[#fff] rounded-[3px]">
            Pending
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
          {" "}
          12 Apr 2024{" "}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button className="bg-[#687177] capitalize rounded-[5px] text-[#fff] px-3 py-1 cursor-pointer">
            confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#3D464D] rounded-md">
        <h2 className="text-xl font-medium pb-5 text-[#fff]">
          Withdrawal Request
        </h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#65727a] uppercase text-[#fff] text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[25%] p-2"> No </div>
              <div className="w-[25%] p-2"> Amount </div>
              <div className="w-[25%] p-2"> Status </div>
              <div className="w-[25%] p-2"> Date </div>
              <div className="w-[25%] p-2"> Action </div>
            </div>
            {
              <List
                style={{ minWidth: "340px" }}
                className="List"
                height={350}
                itemCount={2000}
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
  );
};

export default PaymentReq;
