import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser'
// import JWT_SECRET from './Signup.js'

// import User from '../db.js'
// const express= require('express');
// const router=express.Router()
const router=express.Router()
const JWT_SECRET='sk_883'

const authenticateToken = (req, res, next) => {
     const authHeader = req.headers['token']
     console.log(authHeader)
     
 
     // Extract the token from the 'Authorization' header (in the format: 'Bearer TOKEN')
     // const token = toString(authHeader )
     const token=authHeader
 
     if (!token) {
         return res.status(401).json({ message: 'Access token is missing' });
     }
 
     
 
     // Verify the token
     jwt.verify(token, JWT_SECRET, (err,req) => {
         if (err) {
             return res.status(403).json({ message: err });
         }
 
         // Attach the user data to the request object for use in the route
     //     req.user = user;
         next(); // Proceed to the next middleware or route handler
     });
 };

router.use(bodyParser.json()); 
router.get('/login',authenticateToken ,(req,res)=>{
     // const usertoken=req.query.token
     res.json({"Message":"Aapka swagat hai"})


})
//Protected routes for all the below endpoints.
router.put('/account',async(req,res)=>{
    
})
router.put('/payment',async(req,res)=>{
    
})
router.put('/purchase',async(req,res)=>{
    
})
router.post('/logout',async(req,res)=>{
     
})
export default router
