const express = require ("express");
const mongoose = require ("mongoose");
const dotenv = require("dotenv");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const middleware= require("./middleware/middleware")
const app=express();  
dotenv.config()
app.use(cors());
// app.use(cors());


const userRoutes = require ("./routes/user");
const postRoutes = require ("./routes/post");

const port = process.env.PORT;
const db = process.env.DATABASE_URL;

mongoose.connect (db).then(()=>{
    console.log("db connected succesfully")
    })
    .catch(()=>console.log("error in connecting to database"))


app.use(bodyParser.json());

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/posts",middleware,postRoutes);
app.get("/",(req,res)=>{
    res.json({
        status : "from the index page"
    })
})


app.get("*",(req,res)=>{
    res.json({
        status : "api not found"
    })
})


app.listen(port ,()=> console.log(`server is running ${port}` ))