import React from "react";
import Cart from "../Cart";

const FeaturedProducts = () => {
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[40px]">
          <h2>Featured Products</h2>
        </div>
      </div>

      <div className="w-full rounded-[6px] grid gap-5 grid-cols-5 lg:grid-cols-3 lg:gap-9 md-lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        {[1, 2, 3, 4, 5, 6, 7].map((product, index) => (
          <Cart product={product} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
