const express = require("express");
const httpLogger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const port = 3000;

const app = express();
app.use(httpLogger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
