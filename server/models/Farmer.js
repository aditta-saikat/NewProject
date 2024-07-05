const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },

  village: { type: String },

  fathersName: { type: String },
});

module.exports = mongoose.model("Farmer", farmerSchema);
