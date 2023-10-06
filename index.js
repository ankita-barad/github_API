require("dotenv").config();
const express = require("express");
const { connection } = require("./db");
const axios = require("axios");
const { gitHubRoute } = require("./routes/github.route");
const app = express();

app.use(express.json());

app.use("/github", gitHubRoute);

app.listen(3310, async () => {
  await connection;
  console.log("server started on port 3310");
});
