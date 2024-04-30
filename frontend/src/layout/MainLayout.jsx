import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/reducers/homeReducer";
import { useEffect } from "react";

const MainLayout = () => {
 

  return (
    <section className="w-full">
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
