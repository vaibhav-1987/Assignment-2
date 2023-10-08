const express= require ("express");
const router = express.Router();
const Post = require("../models/post");
const bodyParser= require("body-parser");



router.get("/",async(req,res)=>{   
try{   
    const posts= await Post.find({user:req.user})
    res.status(200).json({
        status : "success in fetcching posts",posts
    })
}catch(err){
    res.json({
        status :"failed",
        message : err
    })
}})
router.get("/:id",async(req,res)=>{
    try{   
        console.log(req.params)
        const post= await Post.findById(req.params.id)
        res.status(200).json({
            status : "successfully fetched post",post
        })
    }catch(err){
        res.json({
            status :"failed",
            message : err
        })
    }

   
})
router.post("/", async(req,res)=>{
    try{
        const {title,body,image}=req.body;
        const post = await Post.create({title,body,image,user:req.user})
        res.status(200).json({
            status : "post suceessfully created",post
        })
    }catch(err){
        res.json({
            status : 'failed',
            message : err
        })
    }
   
})
router.put("/:id", async(req,res)=>{
    try{
        // const {title,body}=req.body;
        const {id} = req.params
        const oldPost = await Post.findByIdAndUpdate(id,req.body)
        res.status(200).json({
            status : "post suceessfully updated",oldPost
        })
    }catch(err){
        res.json({
            status : 'failed',
            message : err
        })
    }
   
})
router.delete("/:id", async(req,res)=>{
    try{
       
        const {id} = req.params
        const deletedPost = await Post.findByIdAndDelete(id)
        res.status(200).json({
            status : "post suceessfully deleted",deletedPost
        })
    }catch(err){
        res.json({
            status : 'failed',
            message : err
        })
    }
   
})
 module.exports = router ;