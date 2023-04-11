const usermodel= require("../models/user");
const bcrypt=require("bcrypt") 
const jwt=require("jsonwebtoken") 
const SECRET_KEY=`${process.env.SECRET_KEY}`; 

const signup=async(req,res)=>{ 
    //Exiting user check
    //HasHed password
    //User creation
    //Token generate 
    const{username,email,password}=req.body;
    try{
        const existingUser=await usermodel.findOne({email:email}); 
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        } 
        const hashedPassword=await bcrypt.hash(password,10);
        const result=await usermodel.create({
            email:email,
            password:hashedPassword,
            username: username
        }); 
        const token= jwt.sign( {email:result.email,id:result._id},SECRET_KEY);
         res.status(201).json({user:result,token:token});
             } 
             catch(error){
                console.log(error);
                res.status (500).json({message:"Something went wrong"})

             }

     // try{
    //     const extinguser=await usermodel.findOne({email:email})
    //     if(extinguser){
    //        return res.status(400).json("user already exist")
    //     }
    //      const hashpassword=await bcrypt.hash(password,10)
    //      const user=await usermodel.create({username:username,email:email,password:hashpassword})
    //   }
    //      catch(err){
    //       console.log(err)
    //      }      
} 
const signin=async(req,res)=>{
    const {email,password} =req.body;  
    try{
        const existingUser=await usermodel.findOne({email:email}); 
        if(!existingUser){
            return res.status(404).json({message:"User not found"})
        }  
        const matchPassword=await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        } 
        const token= jwt.sign( {email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(200).json({user:result,token:token});
    } 
    catch(error){ 
        console.log(error);
                res.status (500).json({message:"Something went wrong"})

  

    }
    
} 
module.exports={signup,signin}