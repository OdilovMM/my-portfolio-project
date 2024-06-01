import AddBanner from "../../views/components/AddBanner";
import Pending from "../../views/Pending";
import Deactive from "../../views/Deactive";
import OrderDetails from "../../views/seller/OrderDetails";
import EditProduct from "../../views/seller/EditProduct";
import Profile from "../../views/seller/Profile";
import SellerAdminChat from "../../views/seller/SellerAdminChat";
import SellerCustomerChat from "../../views/seller/SellerCustomerChat";
import Payments from "../../views/seller/Payments";
import SellerOrders from "../../views/seller/SellerOrders";
import Discount from "../../views/seller/Discount";
import AllProducts from "../../views/seller/AllProducts";
import AddProduct from "../../views/seller/AddProduct";
import SellerDashboard from "../../views/seller/SellerDashboard";

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
