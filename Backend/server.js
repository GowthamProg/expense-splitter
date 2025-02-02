//require('dotenv').config();

const express= require('express');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors =require('cors');
const jwt =require('jsonwebtoken');

const app=express();
app.use(bodyparser.json());
app.use(cors());

const uri="mongodb://localhost:27017/Expensetrack";
const client = new MongoClient(uri);
const Secret_key='NzVkYjFlNjg3OTkxMDYxYmRjNzJkNzc2OGYyNjBlYmIzNDYyYjUzYjVkMzVkZmE3';

let collection;
async function connectToDatabase(){
    if(!collection)
    {
        await client.connect();
        collection = client.db("Expensetrack").collection('user');
    }
    return collection;
}

let collectionuser;
async function connectTouserDatabase(){
    if(!collectionuser)
    {
        await client.connect();
        collectionuser= client.db("Expensetrack").collection('user_frnds');
    }
    return collectionuser;
}

    
//handle to login
app.post('/Login',async(req,res)=>{
    const {username,password} =req.body;
    try{
        const usercollection =await connectToDatabase();
        const useravailable = await usercollection.findOne({username,password});
        if(useravailable){
            const token=jwt.sign({username},Secret_key,{expiresIn: '1h'});
            return res.status(200).json({
                message:"Login successfull",
                username:useravailable.username,
                token
            });
        }
        res.status(400).json({ message:"Invalid credentials" });
    }catch(error)
    {
        res.status(500).json({message:"Login failed",error});
    }
});


//handle to registor
app.post('/Registor',async(req,res)=>{
    const {username,password,mobileno} = req.body;
    try{
        const usersCollection =await connectToDatabase();
        const userdataCollection =await connectTouserDatabase();

        const userexists = await usersCollection.findOne({username});
        if(userexists){
            return res.status(400).json({message:"Username already taken"});
        }
        const newuser = await usersCollection.insertOne({username,password,mobileno});

        await userdataCollection.insertOne({
            user_id:newuser.insertedId,
            username:username,
            friends: []
        });
        res.status(201).json({message:"Reg sucessfull"});
    }catch(error){
        res.status(500).json({message:"Error",error});
    }
});



//handle to add frnds number
app.post('/Members',async(req,res)=>{
    const {username,frndname,frndnumber} = req.body;
    try{
        const usercollection=await connectToDatabase();
        const userdataCollection =await connectTouserDatabase();

        const user =await usercollection.findOne({username});
        if(!user)
        { return res.status(404).json({message:"User not found"});}

        const update = await userdataCollection.updateOne(
            {user_id :user._id},
            {$push : {friends :{ frndname,frndnumber}}}
        )
        // await usercollection.insertOne({frndname,frndnumber});
        res.status(201).json({message:"Reg sucessfull"});
    }catch(error){
        res.status(500).json({message:"Error", error});
    }
});


//token handling
app.get('/validate-token',(req,res)=>{
    const token= req.headers.authorization?.split(' ')[1];
    if(!token)
    {return res.status(401).json({message:"TOken missing"})};

    try{
        const decode =jwt.verify(token,Secret_key);
        return res.status(200).json({valid:true,decode});
    }catch(err){
        return res.status(401).json({valid:false,message:"Invalid token"});
    }
});

const PORT= 5000;//process.env.PORT ||
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
