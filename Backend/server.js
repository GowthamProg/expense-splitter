//require('dotenv').config();

const express= require('express');
const { MongoClient } = require('mongodb');
const bodyparser =require('body-parser');
const cors =require('cors');

const app=express();
app.use(bodyparser.json());
app.use(cors());

const uri="mongodb://localhost:27017/Expensetrack";
const client = new MongoClient(uri);

async function connectToDatabase(){
    await client.connect();
    return client.db().collection('user');
}


//handle to login
app.post('/Login',async(req,res)=>{
    const {username,password} =req.body;
    try{
        const usercollection =await connectToDatabase();
        const useravailable = await usercollection.findOne({username,password});
        if(useravailable){
            return res.status(200).json({
                message:"Login successfull",
                username:useravailable.username,
            });
        }
        res.status(400).json({
            message:"Invalid credentials"
        });
    }catch(error)
    {
        res.status(500).json({message:"Login failed",error});
    }
})


//handle to post
app.post('/Registor',async(req,res)=>{
    const {username,password,mobileno} = req.body;
    try{
        const usersCollection =await connectToDatabase();
        const userexists = await usersCollection.findOne({username});
        if(userexists){
            return res.status(400).json({message:"Username already taken"});
        }
        await usersCollection.insertOne({username,password,mobileno});
        res.status(201).json({message:"Reg sucessfull"});
    }catch(error){
        res.status(500).json({message:"Error",error});
    }
});

const PORT= 5000;//process.env.PORT ||
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});