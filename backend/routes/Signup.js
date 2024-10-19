import express from 'express';
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
const JWT_SECRET='sk_883'
import { Signup } from '../auth.js';
import { User } from '../db.js';
import bcrypt from 'bcrypt';
import cors from 'cors'

const master_user='aezakmi'
const router=express.Router()
router.use(cors(
    {
        origin:"https://localhost:5173"
    }
)) ;
router.use(bodyParser.json()); 
router.post('/',async(req,res)=>{
    const {id, password}= req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if(id==null||password==null){
        res.send("Null Input, mister!!")
    }

    if(Signup(req.body).success){
        const available=await User.findOne({id:id})
        if(available){
            res.send("already a user")
        }
        else{
    
    const user=new User({
        "id":id,
        "password":hashedPassword,
        "wallet":0
    })
    const token = jwt.sign({id:id,password:hashedPassword}, JWT_SECRET, { expiresIn: '1000h' });
    await user.save();
    res.send(token )
}
}
else{
    res.send("incorrect schema Input, mister!!")
}
    // await res.send('this is the 1st signup page')
    // const 
})

router.get('/master/:mid',async(req,res)=>{
    const pass=req.params.mid
    if(pass===master_user){
        const data=await User.find({})
        res.json({"data":data})
    }
    else{
        res.send("incorrext credentials")
    }
})
export default router
// export default {
//     router
// }
// module.exports=router