const mongoose = require('mongoose');

const Userdash = new mongoose.Schema({
    user_ID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },

    username : String,

    trips : [{
        events : { 
            type : String,
        },
        fromdate : {
            type : Date,
        },
        todate : {
            type : Date,
        },
        friendlist: [String]
    }]
});

const Userdashboard = mongoose.model('Userdashboard', Userdash);
module.exports = {Userdashboard};