import React from "react";
import { Banner, Category, FeaturedProducts, Products } from "../components";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <Category />
      <div className="py-[40px]">
        <FeaturedProducts />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Top Rated Product" />
            </div>
            <div className="overflow-hidden">
              <Products title="Top Rated Product" />
            </div>
            <div className="overflow-hidden">
              <Products title="Top Rated Product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
