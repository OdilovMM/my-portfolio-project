import { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));

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
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/payment-request",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/block-seller",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers-request",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-seller",
    element: <AdminDashboard />,
    role: "admin",
  },
];
