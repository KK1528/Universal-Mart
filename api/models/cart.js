const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        id: { type: String, required: true },
        img: { type: String, required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 } // Default quantity is 1
      }
    ],
    totalQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number , default:0}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
