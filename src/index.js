// console.log("Hello CheezyCode") 
const express=require('express');
//require('dotenv').config()

const app=express() 
app.use(express.json());

// const quotes=require("./dummyjson.json") 
const noteRouter=require("./Routes/noteRoutes")
const userRouter=require("./Routes/userRoutes")
const dotenv=require("dotenv") ;
const cors=require("cors")  //cross origin resource sharing 

const mongoose=require("mongoose"); 
app.use(cors());
// app.use((req,res,next)=>{
//     console.log("http method - " + req.method + ",URL -"+req.url);
//     next();
// })
app.use("/users", userRouter) 
app.use("/note",noteRouter) 
app.get("/",(req,res)=>{
    res.send("Notes API from cheezycode")
})
// const fetch = require('node-fetch');

// let url = "https://www.reddit.com/r/popular.json";

// let settings = { method: "Get" };

// fetch(url, settings)
//     .then(res => res.json()) 
//     .then((json) => {
//         // do something with JSON
//     });  

// app.get('/quote',(req,res)=>{

//     fetch(url, settings)
//     .then(res =  > res.json())
//     .then((json) => {
//         res.send(json)
//     });
// }) 

// app.get("/quote",(req,res)=>{
//     res.status(200).json(quotes); 
// })
// app.get("/random",(req,res)=>{
//     let index=Math.floor(Math.random()*quotes.length)
//     let quote=quotes[index];
//     res.status(200).json(quote);

// }); 

mongoose.connect(`mongodb+srv://admin:admin@cluster0.zobm7uy.mongodb.net/test?retryWrites=true&w=majority`)
.then(()=>{ 

    const port = process.env.PORT || 6000;
app.listen(port,()=>{
    console.log("Server started on port, 6000" );
})
}) 
.catch((error)=>{

    console.log(error)
}) 
