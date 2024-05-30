import { lazy } from "react";

const SuccessPage = lazy(() => import("../../views/seller/SuccessPage"));
const AnAuthorized = lazy(() => import("../../views/AnAuthorized"));
const Home = lazy(() => import("../../views/Home"));
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/seller/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/unauthorized",
    element: <AnAuthorized />,
  },
  {
    path: "/success?",
    element: <SuccessPage />,
  },
];

export default publicRoutes;
