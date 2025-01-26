const express = require("express");
const httpLogger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const {
  uploadData,
  initializeFirebaseApp,
  getData,
} = require("./firebase/firebase");

const port = 3000;

const app = express();
app.use(httpLogger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

initializeFirebaseApp();

app.get("/upload", async (req, res) => {
  try {
    await uploadData();
    res.status(200).send("Data uploaded successfully");
  } catch (error) {
    console.error("Error uploading data", error.stack);
    res.status(500).send("Error uploading data");
  }
});

app.get("/get", async (req, res) => {
  try {
    const data = await getData();
    res.status(200).send(data);
  } catch (error) {
    console.error("Error getting data", error.stack);
    res.status(500).send("Error getting data");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Root endpoint accessed");
});
