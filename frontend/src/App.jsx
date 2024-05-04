import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  About,
  AddedProductCart,
  Blog,
  CategoryProducts,
  Contact,
  Home,
  LoginPage,
  ProductDetail,
  RegisterPage,
  ShippingPage,
  Shop,
  SearchPage,
  PaymentPage,
  DashboardPage,
  HomeProfile,
  MyOrderPage,
} from "./pages";
import { MainLayout } from "./layout";
import ProtectedRoute from "./utils/ProtectedRoute";

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
          <Route path="payment" element={<PaymentPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="product/details/:slug" element={<ProductDetail />} />
          <Route path="products/search?" element={<SearchPage />} />
          <Route path="products?" element={<CategoryProducts />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeProfile />} />
            <Route path="my-orders" element={<MyOrderPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
