const user = require("../models/user");
const { verifytokenandAuthorization, verifytokenandAdmin} = require("./verifytoken");
const router = require("express").Router();
const CryptoJS = require("crypto-js")

//UPDATE
router.put("/:id" , verifytokenandAuthorization, async (req,res)=>{
    if(req.body.password){
        req.body.password= CryptoJS.AES.encrypt(req.body.password , process.env.PASSKEY).toString()
    }

    try{
        const updateduser = await user.findByIdAndUpdate(req.params.id , {
            $set: req.body
        } , {new:true});
        res.status(200).json(updateduser)
    }catch(err){req.status(500).json(err)}
})

//DELETE
router.delete("/:id" , verifytokenandAuthorization , async (req,res)=>{
    try{
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json("user is scuccessfully removed form the database")
    }catch{
        res.status(500).json(err)
    }
})

//GET
router.get("/find/:id" , verifytokenandAdmin , async (req,res)=>{
    try{
        const userr = await user.findById(req.params.id);
        const { password , ...others} = userr._doc;
        res.status(200).json(others);
    }catch{
        res.status(500).json(err)
    }
})


//GET ALL USER
router.get("/" , verifytokenandAdmin , async (req,res)=>{
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//GET USER STATS
router.get("/stats", verifytokenandAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await user.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;