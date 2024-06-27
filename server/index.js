const express = require("express");
const UserAuthRouter = require("./routes/UserAuthRouter");

const CategoryRouter = require("./routes/CategoryRouter");
const BlogRouter = require("./routes/BlogRouter");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/user", UserAuthRouter);
app.use("/category", CategoryRouter);
app.use("/blog", BlogRouter);

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
