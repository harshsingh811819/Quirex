import express from 'express';
const router = express.Router(); //express se router nikale hai.
import {userModel} from '../model/table.js'

router.post('/user-register',async(req, res)=>{
    const {name, email,password,contact,address} = req.body;
    const {profile} = req.files;
    profile.mv("uploads/"+profile?.name,(err)=>{
        if(err){
            res.send(err)
        }
    })
    const isExist = await userModel.findOne({email});
    if(isExist){
        res.send("User already exist")
    }else{
        const data = new userModel({name,email,password,contact,address,profile:profile?.name})
        const result = await data.save();
        res.send(result);
    }
})


export default router;