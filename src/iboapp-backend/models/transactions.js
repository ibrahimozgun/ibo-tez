const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "Satis",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
