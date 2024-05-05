import React from "react";
import { Cart } from "../../components";

const WishlistPage = ({ product, index }) => {
  return (
    <div className="bg-white shadow-lg p-2 gap-2 rounded-md w-full flex flex-row flex-wrap">
      <Cart product={product} index={index} />
      <Cart product={product} index={index} />
      <Cart product={product} index={index} />
      <Cart product={product} index={index} />
      <Cart product={product} index={index} />
    </div>
  );
};

export default WishlistPage;
