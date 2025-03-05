const express = require("express");
require("dotenv").config();
const database = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
database();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT} `);
});
