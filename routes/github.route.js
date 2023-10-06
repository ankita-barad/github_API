const express = require("express");
const gitHubRoute = express.Router();
const axios = require("axios");
const { GitHubModel } = require("../models/github.model");

// API 1: Save GitHub Data to MongoDB
gitHubRoute.post("/github", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const githubData = response.data;

    // Loop through each repository and insert or update in MongoDB using Mongoose
    for (const repo of githubData) {
      await GitHubModel.findOneAndUpdate({ id: repo.id }, repo, {
        upsert: true,
      });
    }

    res.status(201).json({ message: "GitHub data saved to MongoDB" });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API 2: Retrieve Saved GitHub Data from MongoDB
gitHubRoute.get("/github/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const repo = await GitHubModel.findOne({ id });
    if (!repo) {
      res.status(404).json({ error: "GitHub repository not found" });
    } else {
      res.status(200).json(repo);
    }
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { gitHubRoute };
