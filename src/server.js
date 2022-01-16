const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: true }));

app.use("/", require("./routes"))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});