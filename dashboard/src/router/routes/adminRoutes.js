import AdminDashboard from "../../views/admin/AdminDashboard";
import Orders from "../../views/admin/Orders";
import Category from "../../views/admin/Category";
import Sellers from "../../views/admin/Sellers";
import PaymentReq from "../../views/admin/PaymentReq";
import DeactiveSeller from "../../views/admin/DeactiveSeller";
import SellerReq from "../../views/admin/SellerReq";
import SellerDetail from "../../views/admin/SellerDetail";
import ChatSeller from "../../views/admin/ChatSeller";
import OrdersDetail from "../../views/admin/OrdersDetail";

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
    path: "admin/dashboard/orders/details/:orderId",
    element: <OrdersDetail />,
    role: "admin",
  },
];
