const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        id:{
          type:String,
        },
        img:{
          type:String,
        },
        title:{
          type:String,
        },
        size:{
          type:String,
        },
        color:{
          type:String,
        },
        price:{
          type:Number,
        },
        quantity:{
          type:Number,
        },
      },
    ],
    totalQuantity : {type:Number , default:0},
    totalPrice : {type:Number},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);