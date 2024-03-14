const jwt = require("jsonwebtoken")

const verifytoken = (req ,res, next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token  = authHeader.split(" ")[1];
        jwt.verify(token , process.env.JWT_KEY , (err,user)=>{
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        })
    }else{
        res.status(401).json("you are not authenticated ");
    }
}

const verifytokenandAuthorization = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("you are not allowed to do that")
        }
    })
}

const verifytokenandAdmin = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("you are not allowed to do that")
        }
    })
}

module.exports = {verifytoken,verifytokenandAuthorization,verifytokenandAdmin};