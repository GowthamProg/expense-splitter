const mongoose = require('mongoose');
const Event = new mongoose.Schema({
    user_ID : {
        type : mongoose.Schema.Types.ObjectID,
        ref : 'Users',
        required : true
    },
    username : String ,
    events : [
        {subevents : [{
        eventname : String,
        amount : Number,
        friends : {
            type : Map,
            of : Number
        }
    }]
  }]
});

const EventCollection = mongoose.model('EventCollection',Event);
module.exports = {EventCollection};