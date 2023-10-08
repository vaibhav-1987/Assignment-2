const express = require("express");
const router = express.Router();
const User = require ("../models/user");
const { body,validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
// const secret = process.env.SECRET;
const secret ="RESTAPI";
router.get("/",(req,res)=>{   
    res.json({
        status : "success"
    })
})

router.post("/register", 
    body("email").isEmail(), body("name").isAlpha(), body("password").isLength({min:4,max:16 }),
    async (req,res)=>{
    
            const errors = validationResult(req);
            // console.log(errors);
            if(!errors.isEmpty()){
               res.status(400).json({ 
                 message : "name must be string , minimun length of passwoed is 4",
                 errors : errors.array(),
            });
               return;
            }
            const {name,email,password}=req.body;
            // hashing the password using bcrypt
            bcrypt.hash(password,10,async (err,hash)=>{
                if(err){
                    res.json({
                        message :"error in hashing"
                    });
                    return;
                }

                const isUserExist= await User.find({email})
                // console.log(isUserExist)
                if(isUserExist.length>0){
                   return res.json({
                        message : "user already exists"
                    })
                }
                const user = await User.create({name,email,password:hash});
                res.status(200).json({
                    meassage : "registration successful",
                    user
                })
            })

    })

router.post('/login', body("email").isEmail(),body("password"), async(req,res)=>{
    // try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                meassage: "check your email or password"
            })
            return;
        }
         const {email,password}=req.body;
         console.log(password) 
        const user = await User.findOne({email});
        // console.log(user)
        if(!user){
            res.status(400).json({
                message: "user is not registered"
            })
            return;
        }
    //    console.log(password);
    //    console.log({password});
      
       await bcrypt.compare({password},user.password,(err,result)=>{
            if(err){
                console.log("this is comparison of passwords")
               
                res.status(400).json({
                    message: "check your password",
                });
              return
            }
            if(result){
              const token = jwt.sign({
                exp: Math.floor(Date.now()/1000)+(600*600),
                data : user._id
              },secret);
              res.status(200).json({
                message : "login successful",
                token
              })
              return;
            }

        })

    // }catch(err){
    //     res.status(400).json({
    //         message : "invalid credentials",
    //         err : err.message
    //     })
    // }
})

    module.exports = router;