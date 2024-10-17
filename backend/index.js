
import express from 'express';

// const express= require('express');
const app= express();

// const userRoute=require('./routes/User.js')
import userRoute from './routes/User.js'
// const bookRoute=require('./routes/Book.js')
import bookRoute from './routes/Book.js'
// const signupRoute=require('./routes/Signup.js')
import signupRoute from './routes/Signup.js'
// app.use(express.json())

app.use('/user',userRoute)
app.use('/books',bookRoute)
app.use('/signup',signupRoute)

app.listen(3000,()=>{
    console.log("server started in 3001")
});