const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const emailRoute = require("./routes/sendEmail");
const cors = require("cors")
const morgan = require('morgan');


dotenv.config();
app.use(morgan("tiny"));
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => console.log("DB Connection Error:" , err)); 

    app.use(cors());
    app.use(express.json());
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/products", productRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/sendemail" , emailRoute);
    
const port = process.env.PORT || 8000; 
app.listen(port, () => {
    console.log("Backend server is running on port " + port);
});
