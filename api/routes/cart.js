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
router.get("/find/:userId", verifytokenandAuthorization,async (req, res) => {
  // console.log("here--> ")
  // console.log(req.user)
  try {
    const cart = await Cart.findOne({ userId : req.params.userId});
      
     console.log(cart);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//UPDATE
router.put("/:userId", verifytokenandAuthorization, async (req, res) => {
  // console.log(' here -> ' ,req.body);
  const {products,totalPrice, totalQuantity}=req.body
  try {
    // Check if the cart exists for the user
    const cart = await Cart.findOne({ userId: req.params.userId });
    console.log(cart);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    console.log("body sibfojbasd" ,products,totalPrice, totalQuantity);
    cart.products=products;
    cart.totalQuantity=totalQuantity;
    cart.totalPrice=totalPrice;
    await cart.save();
    // // Update the cart
    // const updatedCart = await Cart.findOneAndUpdate(
    //   { user: req.params.userId },
    //   { $set: req.body },
    //   { new: true }
    // );
    
    // Check if the update operation was successful
    // if (!updatedCart) {
    //   console.log("/backend error ");
    //   return res.status(500).json({ message: "Failed to update cart" });
    // }

    // If successful, return the updated cart
    res.status(200).json({msg:"Cart updated succsussfully", cart:cart});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
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