const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/new-expense";

const connectdb = async()=>{
    try{
        const connect = await mongoose.connect(url);
        console.log(`Connection = ${connect.connection.host}`);
    }catch(error){
        console.log("Error connecting backend");
    }
}

module.exports = {connectdb};