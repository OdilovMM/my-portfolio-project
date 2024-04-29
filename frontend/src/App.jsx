import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  About,
  AddedProductCart,
  Blog,
  Contact,
  Home,
  LoginPage,
  ProductDetail,
  RegisterPage,
  ShippingPage,
  Shop,
} from "./pages";
import { MainLayout } from "./layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-cart" element={<AddedProductCart />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="product/details/:slug" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
