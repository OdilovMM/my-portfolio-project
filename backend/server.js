const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const authRouter = require("./routes/authRoutes");
const categoryRouter = require("./routes/dashboard/categoryRoutes");
const productRouter = require("./routes/dashboard/productRoutes");
const sellerRouter = require("./routes/dashboard/sellerRoutes");
const homeRouter = require("./routes/home/homeRoutes");
const cartRouter = require("./routes/frontend/cartRoutes");
const customerRouter = require("./routes/frontend/customerAuthRoutes");
const orderRouter = require("./routes/home/orderRoutes");
const chatRouter = require("./routes/chatRoutes");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

var allCustomer = [];
var allSeller = [];

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some(
    (userData) => userData.customerId === customerId
  );
  if (!checkUser) {
    allCustomer.push({
      customerId,
      socketId,
      userInfo,
    });
  }
};

const addSeller = (sellerId, socketId, userInfo) => {
  const checkUser = allSeller.some(
    (userData) => userData.sellerId === sellerId
  );
  if (!checkUser) {
    allSeller.push({
      sellerId,
      socketId,
      userInfo,
    });
  }
};

io.on("connection", (sock) => {
  console.log("Socket server is running successfully");

  sock.on("addUser", (customerId, userInfo) => {
    addUser(customerId, sock.id, userInfo);
  });

  sock.on("addSeller", (sellerId, userInfo) => {
    addSeller(sellerId, sock.id, userInfo);
  });
});

app.use(bodyParser.json());
app.use(cookieParser());

const { dbConnect } = require("./utils/db");
const { userInfo } = require("os");

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
app.use("/api/v1/chat", chatRouter);

const port = process.env.PORT || 8000;
dbConnect();
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
