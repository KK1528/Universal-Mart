const Cart = require("../models/cart");
const {verifytoken, verifytokenandAuthorization, verifytokenandAdmin} = require("./verifytoken");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const { userId } = req.body; // Extract userId from the request body

  // Assuming Cart model has a field called userId
  const newCart = new Cart({ userId });

  try {
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
      return res.status(200).json({ message: "Cart already exists for this user" });
    }
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


//GET USER CART
router.get("/find/:id", verifytokenandAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId : req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//UPDATE
router.put("/:id", verifytokenandAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifytokenandAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


// //GET ALL

router.get("/", verifytokenandAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;