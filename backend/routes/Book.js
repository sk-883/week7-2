import express from 'express';
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
// const express= require('express');
// const router=express.Router()
const router=express.Router()
router.use(bodyParser.json()); 
import { Book } from '../db.js';
import { add } from '../auth.js'; // we will use this for adding stock as well
const adminpassword="aezakmi"

router.get('/stock',async(req,res)=>{
const data=await Book.find()
res.json({"data":data})
})
router.post('/add/:code',async(req,res)=>{
    const pass=req.params.code
    if(pass!=adminpassword){
        console.log(pass)
        res.send("Access denied!!")
    }
    const {book_id,price,quantity}=req.body
    if(add(req.body).success){

        // if(Book.findOne({id:book_id})){
        //     Book.updateOne(
        //         { id:book_id },
        //         { $inc: { available: quantitiy } }
        //     );
        //     res.send(book_id+" this stock is updated")
        // }

    //     if(Book.findOne({id:book_id})!=null){
    //     const query = { id:book_id };
    //     const update = { $set: { "value": quantitiy } };
    
    //     await Book.findOneAndUpdate(query, update)
    //     res.send("updated")
    // }
    const response=await Book.findOne({ id:book_id})

    
    if(response){
        const valulu=(response)?response.available:0
        const update ={ $set: { available: quantity+valulu } };
        const result=await Book.findOneAndUpdate({ id:book_id},update)
        res.send(await Book.findOne({ id:book_id}))
        // res.send("Book with the id"+response.id +"set to "+response.available+valulu+"quantitiy")
    }
    else{
        
        const newbook=new Book({
            id:book_id,
            price:price,
            available:quantity
        });
        await newbook.save()
        res.send("New book added "+book_id + price + quantity)
    }

    }
    else{
    res.send('Please enter valid data!!')
    }
})
router.get('/hindi',async(req,res)=>{
    await res.send('these are hindi books')
})
router.get('/english',async(req,res)=>{
    await res.send('these are english books')
})
export default router
