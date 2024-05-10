import { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));
const Sellers = lazy(() => import("../../views/admin/Sellers"));
const PaymentReq = lazy(() => import("../../views/admin/PaymentReq"));
const DeactiveSeller = lazy(() => import("../../views/admin/DeactiveSeller"));
const SellerReq = lazy(() => import("../../views/admin/SellerReq"));
const SellerDetail = lazy(() => import("../../views/admin/SellerDetail"));
const ChatSeller = lazy(() => import("../../views/admin/ChatSeller"));
const OrdersDetail = lazy(() => import("../../views/admin/OrdersDetail"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers",
    element: <Sellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/payment-request",
    element: <PaymentReq />,
    role: "admin",
  },
  {
    path: "admin/dashboard/block-seller",
    element: <DeactiveSeller />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers-request",
    element: <SellerReq />,
    role: "admin",
  },
  {
    path: "admin/dashboard/seller/detail/:sellerId",
    element: <SellerDetail />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-seller",
    element: <ChatSeller />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-seller/:sellerId",
    element: <ChatSeller />,
    role: "admin",
  },
  {
    path: "admin/dashboard/order/details/:id",
    element: <OrdersDetail />,
    role: "admin",
  },
];
