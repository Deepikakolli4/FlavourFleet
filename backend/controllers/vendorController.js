const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');
const { response } = require('express');
dotEnv.config();
const secretKey = process.env.jwt_token;
const vendorRegister = async(req,res)=>{
    const {username, email, password} = req.body
    try{
       const vendorEmail = await Vendor.findOne({email});
       if(vendorEmail){
        return res.status(400).json("Email Already taken");
       }
       const hashedPassword = await bcrypt.hash(password,10);
       const newVendor = new Vendor({
         username,
         email,
         password : hashedPassword
       });
       await newVendor.save();
       res.status(201).json({message:"Vendor Regsitered Successfully"});
       console.log("registererd");
    }catch(error){
       console.error(error);
       res.status(500).json({error:"Internal Server Error"});
    }
}

const vendorLogin = async(req,res)=>{
   const {email,password} = req.body;
   try{
      const vendor = await Vendor.findOne({email});
      if(!vendor || !(await bcrypt.compare(password,vendor.password))){
         return res.status(401).json({error:"Invalid Username Or Password"});
      }
      const token = jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:'1h'})
      const vendorId = vendor._id;
      res.status(200).json({ message:"Successfully Logged In",token , vendorId})
      console.log(email,"This is token:",token);
   } catch(error){
     console.error(error);
     res.status(500).json({error:"Internal Server Error"});
   }
}
const getAllVendors = async(req,res)=>{
   try{
      const vendors = await Vendor.find().populate('firm');
      res.status(200).json({vendors})
   }catch(error){
      console.error(error);
      res.status(500).json({error:"Internal Server Error"});
   }
}
const getVendorById = async(req,res)=>{
   //get the vendor Id from the query params
   const vendorId = req.params.id;
   try{
       const vendor = await Vendor.findById(vendorId).populate('firm');
       if(!vendor){
         return res.status(404).json({error:"Vendor not Found"});
       }
       res.status(200).json({vendorId});
   }catch(error){
      console.error(error);
      res.status(500).json({error:"Internal Server Error"});
   }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById}