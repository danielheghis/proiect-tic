const express = require("express");
const app = express();
const httpLogger = require("morgan");
const cors = require("cors");
const port = 3000;

app.use(httpLogger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
