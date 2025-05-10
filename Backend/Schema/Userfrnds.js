const mongoose = require('mongoose');
const Userfrnd = new mongoose.Schema({
    user_ID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    },

    username : String,
    
    friends : [{
        friendName : String,
        friendNumber : {
            type :String,
            match : /^[0-9]{10}$/
        }
    }]
});

const Userfrnds = mongoose.model('Userfriends',Userfrnd);
module.exports = {Userfrnds};