import { lazy } from "react";

const AddBanner = lazy(() => import("../../views/components/AddBanner"));
const Pending = lazy(() => import("../../views/Pending"));
const Deactive = lazy(() => import("../../views/Deactive"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const Profile = lazy(() => import("../../views/seller/Profile"));
const SellerAdminChat = lazy(() =>
  import("../../views/seller/SellerAdminChat")
);
const SellerCustomerChat = lazy(() =>
  import("../../views/seller/SellerCustomerChat")
);
const Payments = lazy(() => import("../../views/seller/Payments"));
const SellerOrders = lazy(() => import("../../views/seller/SellerOrders"));
const Discount = lazy(() => import("../../views/seller/Discount"));
const AllProducts = lazy(() => import("../../views/seller/AllProducts"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);

export const sellerRoutes = [
  {
    path: "/seller/account-pending",
    element: <Pending />,
    ability: "seller",
  },
  {
    path: "/seller/account-deactive",
    element: <Deactive />,
    ability: "seller",
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/add-product",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/products",
    element: <AllProducts />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/discount-product",
    element: <Discount />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/orders",
    element: <SellerOrders />,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/orders/details/:orderId",
    element: <OrderDetails />,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/payments",
    element: <Payments />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-support",
    element: <SellerAdminChat />,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/chat-customer/:customerId",
    element: <SellerCustomerChat />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-customer",
    element: <SellerCustomerChat />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/profile",
    element: <Profile />,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/add-banner/:productId",
    element: <AddBanner />,
    role: "seller",
    status: "active",
  },
];
