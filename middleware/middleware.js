const User = require("../models/user");
const jwt = require ("jsonwebtoken");

const secret="RESTAPI";

const middleware = ( req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split("test ")[1];
      
        jwt.verify(token,secret,async(err,decoded)=>{
            // try{
                if(err){
                    // console.log("error in token verification")
                   res.status(400).json({
            
                        message : "user is not authorized",
                        error:err
                    })
                    return;
                }
                // const {id}=decoded
                // console.log(decoded.id)
                const user =  await User.findOne({_id:decoded.data})
                req.user=user._id;
                next();

            // }catch(err){
            //    res.status(400).json({
            //     status : "invalid data",
            //     error: err
            //    })
            // }
        })
    }

}
module.exports = middleware;