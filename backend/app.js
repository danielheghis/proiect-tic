const express = require("express");
const httpLogger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { initializeFirebaseApp } = require("./firebase/firebase");
const authenticateToken = require("./middleware/authenticateToken");

const port = 3000;

const app = express();
app.use(httpLogger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

initializeFirebaseApp();

const playersRoutes = require("./routes/players");
const matchesRoutes = require("./routes/matches");
const staffRoutes = require("./routes/staff");

app.use("/api/staff", authenticateToken, staffRoutes);
app.use("/api/players", authenticateToken, playersRoutes);
app.use("/api/matches", authenticateToken, matchesRoutes);

app.get("/api/get", authenticateToken, async (req, res) => {
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

app.get("/api", (req, res) => {
  res.send("Hello World!");
  console.log("Root endpoint accessed");
});

app.get("/api/test-token", authenticateToken, (req, res) => {
  res.json({ message: "Token valid", user: req.user });
});
