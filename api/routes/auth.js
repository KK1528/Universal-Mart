const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSKEY
    ).toString(),
  });


  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error("Wrong credentials!"); // Throw error if user is not found
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSKEY
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      throw new Error("Wrong credentials!"); // Throw error if password is incorrect
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    // console.log(err);
    res.status(401).json(err.message); // Send 401 status for authentication errors
  }
});


module.exports = router;