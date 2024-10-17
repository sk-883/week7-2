import mongoose from "mongoose";
// const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sk_883:2qFUWfkyXuaipO1A@sk883.iligdhe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));


const bookSchema=new mongoose.Schema({
    id:String,
    price:Number,
    available:Number
})

const Book = mongoose.model('Book', bookSchema);
const userSchema=new mongoose.Schema({
    id:String,
    password:String,
    wallet:Number,
    purchases:{
        id:mongoose.Schema.Types.ObjectId,
        ref:bookSchema
    }
})
const User = mongoose.model('User', userSchema);

export {Book, User}