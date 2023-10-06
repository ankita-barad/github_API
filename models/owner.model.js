const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  id: Number,
  avatar_url: String,
  html_url: String,
  type: String,
  site_admin: Boolean,
  // Add any other fields that are present in the GitHub data
});

module.exports = { ownerSchema };
