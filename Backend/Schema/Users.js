const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },

    password :{
        type : String,
        required : true
    },
    
    mobileNumber:{
        type:Number,
        required :false,
        unique : true
    }
});

const Users = mongoose.model('users',User);
module.exports = {Users};