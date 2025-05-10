const {Users} = require('../Schema/Users');
const {Userfrnds} = require('../Schema/Userfrnds');
const {Userdashboard} = require('../Schema/Userdashboard');
const {EventCollection} = require('../Schema/EventsCollection');

const RegisterUser = async (req,res)=>{
    try{
        const {username, password,mobileNumber} = req.body;
        const users = new Users({username,password,mobileNumber});
        await users.save();

        const userfrnds1 = new Userfrnds({
            user_ID: users._id ,
            username : username,
            friends : []
        });
        await userfrnds1.save();

        
        const userdashboard1 = new Userdashboard({
            user_ID : users._id,
            username : username,
            trips : [{
                events : '',
                fromdate : '',
                todate : '',
                friendlist : []
            }]
        });
        await userdashboard1.save();
        
        const EventCollection1 = new EventCollection({
            user_ID : users._id,
            username : username,
            events : [{
                subevents: []
            }]
        });
        await EventCollection1.save();

        console.log("Hello");
        return res.json(users);
    }catch(error){
        return res.json({message : "Error registering the users "});
    }
}

module.exports = {RegisterUser};