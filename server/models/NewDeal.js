const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  stockName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const newDealSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    farmerName: { type: String, required: true },
    stock: { type: [stockSchema], required: true },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("NewDeal", newDealSchema);
