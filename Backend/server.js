const express = require('express');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyparser.json());
app.use(cors());

const uri = "mongodb://localhost:27017/Expensetrack";  // Use your correct MongoDB URI
const Secret_key = 'NzVkYjFlNjg3OTkxMDYxYmRjNzJkNzc2OGYyNjBlYmIzNDYyYjUzYjVkMzVkZmE3';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    await client.connect();
    return client.db("Expensetrack");
}

app.post('/Login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const db = await connectToDatabase();
        const usercollection = db.collection('user');
        const useravailable = await usercollection.findOne({ username, password });
        
        if (useravailable) {
            const token = jwt.sign({ username }, Secret_key, { expiresIn: '2h' });
            return res.status(200).json({ message: "Login successful", username: useravailable.username, token });
        }
        res.status(400).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});









// //require('dotenv').config();

// const express= require('express');
// const { MongoClient } = require('mongodb');
// const bodyparser = require('body-parser');
// const cors =require('cors');
// const jwt =require('jsonwebtoken');

// const app=express();
// app.use(bodyparser.json());
// app.use(cors());

// const uri="mongodb://localhost:27017/Expensetrack";
// const client = new MongoClient(uri);
// const Secret_key='NzVkYjFlNjg3OTkxMDYxYmRjNzJkNzc2OGYyNjBlYmIzNDYyYjUzYjVkMzVkZmE3';

// let collection;
// async function connectToDatabase(){
//     if(!collection)
//     {
//         await client.connect();
//         collection = client.db("Expensetrack").collection('user');
//     }
//     return collection;
// }

// let collectionuser;
// async function connectTouserDatabase(){
//     if(!collectionuser)
//     {
//         await client.connect();
//         collectionuser= client.db("Expensetrack").collection('user_frnds');
//     }
//     return collectionuser;
// }

// let dashcollection;
// async function connectTODashboard(){
//     if(!dashcollection){
//         await client.connect();
//         dashcollection=client.db("Expensetrack").collection('user_dashboard');
//     }
//     return dashcollection;
// }
    
// //handle to login
// app.post('/Login',async(req,res)=>{
//     const {username,password} =req.body;
//     try{
//         const usercollection =await connectToDatabase();
//         const useravailable = await usercollection.findOne({username,password});
//         if(useravailable){
//             const token=jwt.sign({username},Secret_key,{expiresIn: '2h'});
//             return res.status(200).json({
//                 message:"Login successfull",
//                 username:useravailable.username,
//                 token
//             });
//         }
//         res.status(400).json({ message:"Invalid credentials" });
//     }catch(error)
//     {
//         res.status(500).json({message:"Login failed",error});
//     }
// });


// //handle to registor
// app.post('/Registor',async(req,res)=>{
//     const {username,password,mobileno} = req.body;
//     try{
//         const usersCollection =await connectToDatabase();
//         const userdataCollection =await connectTouserDatabase();
//         const userdashboard= await connectTODashboard();

//         const userexists = await usersCollection.findOne({username});
//         if(userexists){
//             return res.status(400).json({message:"Username already taken"});
//         }
//         const newuser = await usersCollection.insertOne({username,password,mobileno});
//         await userdataCollection.insertOne({
//             user_id:newuser.insertedId,
//             username:username,
//             friends: []
//         });
//         await userdashboard.insertOne({
//             user_id:newuser.insertedId,
//             username:username,
//             trips:[]
//         })
//         res.status(201).json({message:"Reg sucessfull"});
//     }catch(error){
//         res.status(500).json({message:"Error",error});
//     }
// });


// //token handling
// app.get('/validate-token',(req,res)=>{
//     const token= req.headers.authorization?.split(' ')[1];
//     if(!token)
//     {return res.status(401).json({message:"TOken missing"})};

//     try{
//         const decode =jwt.verify(token,Secret_key);
//         return res.status(200).json({valid:true,decode});
//     }catch(err){
//         return res.status(401).json({valid:false,message:"Invalid token"});
//     }
// });




// //handle to add frnds number
// app.post('/Members',async(req,res)=>{
//     const {username,frndname,frndnumber} = req.body;
//     try{
//         const usercollection=await connectToDatabase();
//         const userdataCollection =await connectTouserDatabase();

//         const user =await usercollection.findOne({username});
//         if(!user)
//         { return res.status(404).json({message:"User not found"});}

//         const update = await userdataCollection.updateOne(
//             {user_id :user._id},
//             {$push : {friends :{ frndname,frndnumber}}}
//         )
//         // await usercollection.insertOne({frndname,frndnumber});
//         res.status(201).json({message:"Reg sucessfull"});
//     }catch(error){
//         res.status(500).json({message:"Error", error});
//     }
// });


// // handle to show frnds details in friends page
// app.get('/Members/:username',async(req,res)=>{
//     const {username} =req.params;

//     try{
//         const usercollection = await connectToDatabase();
//         const userdataCollection =await connectTouserDatabase();

//         const user =await usercollection.findOne({username});
//         if(!user ) { 
//             return res.status(404).json({message:"User not found"}); }
        
//         const userdata = await userdataCollection.findOne({user_id:user._id});
//         if(!userdata || !userdata.friends){
//             return res.status(200).json({friends : []});}
        
//         res.status(200).json({friends : userdata.friends});
//     } catch(error){
//         res.status(500).json({message: "Error fetching data ",error});
//     }
// });


// //handle to update the friends in the member page
// app.put('/Members/:username/:frndname' ,async(req,res) =>{
//     const {username,frndname} =req.params;
//     const {updateFrndname , updateFrndNumber} = req.body;
//     try{
//         const userfrndcollection= await connectTouserDatabase();
//         const result = await userfrndcollection.updateOne(
//             {username,frndname},
//             {$set: {frndname :updateFrndname,frndnumber:updateFrndNumber}}
//         );
//         if(result.modifiedcount === 0)
//             return res.status(404).json({message:"Friend not found"});
//         res.status(200).json({message:"updated sucessfully"});
//     }catch(error){
//         res.status(500).json({message:"Error updating",error});
//     }
// });


// //handle to delete the friend in the member page
// app.delete('/Members/:username/:frndname',async(req,res)=>{
//     const {username , frndname} = req.params;
//     console.log(username,frndname); 
// try{
//     const userdatacollection = await connectTouserDatabase();
//     const result = await userdatacollection.updateOne(
//         {username},
//         {$pull:{friends : {frndname}}}
//         // {$pull:{friends : {frndname:frndname}}}
//     );
//     console.log(result);    
//     if(result.modifiedCount===0) 
//         return res.status(404).json({message:"Freind not found"});
//     res.status(200).json({message:"Deleted"});
// }catch(error){
//     res.status(500).json({message:"Error",error});
// }
// });


















// const PORT= 5000;//process.env.PORT ||
// app.listen(PORT,()=>{
//     console.log(`Server running on port ${PORT}`);
// });
