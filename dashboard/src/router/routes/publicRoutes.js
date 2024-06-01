
import SuccessPage from "../../views/seller/SuccessPage";
import AnAuthorized from "../../views/AnAuthorized";
import Home from "../../views/Home";
import Login from "../../views/auth/Login";
import Register from "../../views/auth/Register";
import AdminLogin from "../../views/auth/AdminLogin";

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
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
