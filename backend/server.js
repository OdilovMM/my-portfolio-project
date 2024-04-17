const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const authRouter = require("./routes/authRoutes");
const { dbConnect } = require("./utils/db");

app.get("/", (req, res) => {
  res.send("Hello from vendor site");
});

app.use("/api/v1", authRouter);

const port = process.env.PORT || 8000;
dbConnect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
