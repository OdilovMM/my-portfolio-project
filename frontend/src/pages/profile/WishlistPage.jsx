import React from "react";
import { Cart } from "../../components";

const WishlistPage = ({ product, index }) => {
  return (
    <div className="bg-white shadow-lg p-5 rounded-md w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
      <Cart product={product} index={index} />
      <Cart product={product} index={index} />
      <Cart product={product} index={index} />
      <Cart product={product} index={index} />
      <Cart product={product} index={index} />
    </div>
  );
};

export default WishlistPage;
