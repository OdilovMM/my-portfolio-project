const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

// router folder imports

const authRouter = require("./routes/authRoutes");
const categoryRouter = require("./routes/dashboard/categoryRoutes");
const productRouter = require("./routes/dashboard/productRoutes");
const sellerRouter = require("./routes/dashboard/sellerRoutes");
const homeRouter = require("./routes/home/homeRoutes");
const cartRouter = require("./routes/frontend/cartRoutes");
const customerRouter = require("./routes/frontend/customerAuthRoutes");
const orderRouter = require("./routes/home/orderRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const dashboardRouter = require("./routes/dashboard/dashboardRoutes");

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:5175",
//       //       "https://eshop-frontend-fawn.vercel.app",
//       //       "https://seller-dashboard-sigma.vercel.app",
//       //       "https://admin-dashboard-seven-lovat-63.vercel.app",
//     ],
//     credentials: true,
//   })
// );

app.use(cors({ origin: true, credentials: true }));
app.options("*", cors());


app.use(bodyParser.json());
app.use(cookieParser());

const { dbConnect } = require("./utils/db");

app.get("/", (req, res) => {
  res.send("Hello from vendor site");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/dashboard", dashboardRouter);

const port = process.env.PORT || 8000;
dbConnect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
