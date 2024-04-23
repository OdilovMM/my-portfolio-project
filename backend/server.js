const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const categoryRouter = require("./routes/dashboard/categoryRoutes");




app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const { dbConnect } = require("./utils/db");

app.get("/", (req, res) => {
  res.send("Hello from vendor site");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoryRouter);

const port = process.env.PORT || 8000;
dbConnect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
