// models/githubRepo.js
const mongoose = require("mongoose");
const { ownerSchema } = require("./owner.model");

const githubRepoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  html_url: String,
  description: String,
  created_at: Date,
  open_issues: Number,
  watchers: Number,
  owner: ownerSchema,
});

const GitHubModel = mongoose.model("GitHubRepo", githubRepoSchema);
module.exports = { GitHubModel };
