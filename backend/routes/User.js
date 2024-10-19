import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser'
import {User} from '../db.js'
import {Book} from '../db.js'
// import { getItem,setItem,clearItem } from '../localstorage.js';
// import JWT_SECRET from './Signup.js'

// import User from '../db.js'
// const express= require('express');
// const router=express.Router()
const router=express.Router()
const JWT_SECRET='sk_883'
// global.localStorage={}

let locaStorage={}
// function getItem(uid){

//     return locaStorage[uid]
// }
// function setItem(uid, uvalue){

// locaStorage[uid]=uvalue
// // age["cid"]="cvalue"

// }
// function clearItem(){
//     locaStorage={}
// }

const authenticate = (req, res, next) => {
    //  const token = req.headers['token']
    //  const id= req.headers['id']     // retrieve the data from local storage
    const token= locaStorage['token']
    const id= locaStorage['id']
     console.log(id+" "+token)
    
     if (!token) {
         return res.status(401).json({ message: 'Access token is missing' });
     }
 
     
 
     // Verify the token
     jwt.verify(token, JWT_SECRET, async(err,user) => {
         if (err) {
             return res.status(403).json({ message: err });
         }
         const result =await User.findOne({id:id})
         if(id==user.id&&result){
            //Ensuring that the id should match corresponding jwt and that
            //he should be still a member of the database
        console.log(user)
         next(); // Proceed to the next middleware or route handler
         }
         else{
            res.status(404).send("Error Credentials")
         }
        
     });
    };




router.use(bodyParser.json()); 
router.get('/login',(req,res)=>{
     // here, store the token and the userID in the local storage and then add m
     //to authenticate. Detete them in the logout page.
     // Finally remove middleware from here, coz data will be stored in local
     //storage and then only we can use them in middlewares


     const token = req.body['token']
     const id= req.body['id']     

     

 
     if (!token) {
         return res.status(401).json({ message: 'Access token is missing' });
     }
 
     
 
     // Verify the token
     jwt.verify(token, JWT_SECRET, async(err,user) => {
         if (err) {
             return res.status(403).json({ message: err });
         }
         const result =await User.findOne({id:id})
         if(id==user.id&&result){
            //Ensuring that the id should match corresponding jwt and that
            //he should be still a member of the database
        //  console.log(user)    
        //  setItem('token',token)
        //  setItem('id',id)
        locaStorage['token']=token
        locaStorage['id']=id
        //  console.log(getItem(id)+" "+getItem(token))
        console.log(locaStorage['id']+locaStorage['token'])
         res.json({"Message":"Aapka swagat hai"})
          // Proceed to the next middleware or route handler
         }
         else{
            res.status(404).send("Error Credentials")
         }
        
     });


})
//Protected routes for all the below endpoints.
router.put('/account',async(req,res)=>{
    // user id will be stored in the lcoal storgae once the user has logged in
    // for the time being, we are using id from re.params
    // const id=req.params.id
    // await User.findOneAndUpdate({"id":id},{
    //     {}}
    // )
    const id=locaStorage['id']
    console.log(id)
    const data=await User.findOne({id:id})
    res.json({
        "info":data})
})
router.put('/payment/:amount',async(req,res)=>{
    // user id will be stored in the lcoal storgae once the user has logged in
    // for the time being, we are using id from re.params
    const amount=req.params.amount
    const id=locaStorage['id']
    await User.findOneAndUpdate({"id":id},
        {$inc: {wallet:amount}}
    )
    const data=await User.find({id:id})
    // res.json({"message":"payment done",
    //     "info":info
    // })
    res.json({"messgage":"payment done",
        "info":data})
})
router.put('/purchase/:book_id',async(req,res)=>{
    // user id will be stored in the lcoal storgae once the user has logged in
    // for the time being, we are using id from re.params
    const id=locaStorage['id']
    const book_id=req.params.book_id
    // console.log(i)
    const price= (await Book.findOne({id:book_id})).price
    
   await User.findOneAndUpdate({"id":id},{
        $inc:{wallet:-price},
        $push:{purchases:book_id}
    })
    const data= await User.findOne({"id":id})
    res.json({"message":"purahcse done",
        "data":data}
    )
})
router.post('/logout',authenticate,async(req,res)=>{
    locaStorage={}
     //clear the local storage containing rhe token and the userId of the user.
})
export default router
