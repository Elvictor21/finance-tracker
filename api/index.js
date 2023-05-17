const express= require("express");
const cors=require('cors');
require("dotenv").config();
const Transaction= require('./models/transaction.js');
const User= require('./models/User.js');
const { default: mongoose } = require("mongoose");
const jwt= require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const app= express();
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const secretSalt="duiqd89109319038132hdoqwnm2";



app.use(cors({credentials:true, origin:'http://localhost:3000'})); //cors enable us to communicate the api
app.use(express.json());// this help display the recieved data from what to typed in the preview{chrome inspect}
app.use(cookieParser());

app.get('/api/test.js',(req,res)=>{
    res.json("test Ok8");
   
});
// posting the info in /api/test.js to the index


// REGISTER SCRIPT
app.post('/register', async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL)
    const{username,password}=req.body
    const usernameCheck= await User.findOne({username});
    if(usernameCheck){
      res.status(400).json("already used");
    }else{
        try {
            const userDoc= await User.create({
             username,
             password: bcrypt.hashSync(password,salt)
            });
            res.json(userDoc);
         } catch (e) {
             res.status(400).json(e);
         }
    }
    
    
});

//LOGIN SCRIPT
app.post("/login", async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const {username,password}=req.body;
    const userDoc= await User.findOne({username});
    const passOk= bcrypt.compareSync(password, userDoc.password);
    // res.json(passOk);
    if(passOk){
        jwt.sign({username,id:userDoc._id},secretSalt,{},(err,token)=>{
            if(err) throw err;
            res.cookie("token", token).json({
                id:userDoc._id,
                username
            });
        });
    }else{
        res.status(400).json('Wrong Credentials');
    }
});

//to get user jwt token
app.get('/profile',(req,res)=>{
    const {token}= req.cookies;
    jwt.verify(token,secretSalt,{},(err,info)=>{
        if(err)throw err;
        res.json(info);

    })
    // res.json(req.cookies)
})

app.post('/transaction', async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL)
    // console.log(process.env.MONGO_URL);
    
    const {token}= req.cookies;
    jwt.verify(token, secretSalt,{},async(err,info)=>{
        if(err)throw err;
        const{price,name,description,datetime}= req.body;
    const transaction= await Transaction.create({
        price,
        name,
        description,
        datetime,
        user:info._id
    });
    res.json(transaction);

    })
    //inserting the req.body into the transaction model
    
  
});

app.get('/transactions', async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
   const transactions= (await Transaction.find().populate('user',['username']));  
   res.json(transactions);
});

//LOGOUT SCRIPT
app.post('/logout',(req,res)=>{
     res.cookie("token", " ").json("ok");
})
app.listen(4040);
