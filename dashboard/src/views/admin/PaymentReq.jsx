import React, { forwardRef, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentRequestFromSeller } from "../../store/Reducers/paymentReducer";

function handleOnWheel({ deltaY }) {}

const outerElType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentReq = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { pendingWithdraws, loader } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getPaymentRequestFromSeller());
  }, [dispatch]);

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
          {index + 1}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
          ${pendingWithdraws[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="px-3 py-1 bg-[#6e7376] capitalize text-[#fff] rounded-[3px]">
          {pendingWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
        {moment(pendingWithdraws[index]?.createdAt).format("LLL")}
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
          Payment Request
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
                itemCount={pendingWithdraws?.length}
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
