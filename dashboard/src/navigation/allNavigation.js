import { RxDashboard } from "react-icons/rx";
import { FaBasketShopping, FaUserLock } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { MdPayments } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import { IoMdChatboxes } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { MdDiscount } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <RxDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <FaBasketShopping />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <TbCategoryFilled />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <LuUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Payment",
    icon: <MdPayments />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Block Seller",
    icon: <FaUserLock />,
    role: "admin",
    path: "/admin/dashboard/block-seller",
  },
  {
    id: 7,
    title: "Request",
    icon: <CiSquareQuestion />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 8,
    title: "Chats",
    icon: <IoMdChatboxes />,
    role: "admin",
    path: "/admin/dashboard/chat-seller",
  },
  // seller navlinks
  {
    id: 9,
    title: "Dashboard",
    icon: <RxDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 10,
    title: "Add Product",
    icon: <IoIosAddCircle />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 11,
    title: "All Products",
    icon: <CiBoxList />,
    role: "seller",
    path: "/seller/dashboard/products",
  },
  {
    id: 12,
    title: "Discount Products",
    icon: <MdDiscount />,
    role: "seller",
    path: "/seller/dashboard/discount-product",
  },
  {
    id: 13,
    title: "Orders",
    icon: <FaShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 14,
    title: "Payments",
    icon: <MdPayments />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 15,
    title: "Chat-Customer",
    icon: <IoMdChatboxes />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 16,
    title: "Support",
    icon: <MdOutlineSupportAgent />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
  {
    id: 17,
    title: "Profile",
    icon: <MdManageAccounts />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
];
