const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const {connectdb} = require('./Model/model');
//const {LoginRoute} = require('./Router/Loginroute');
const RegisterRoute = require('./Router/RegisterRoute');

connectdb();
///app.use('/Login',LoginRoute);
app.use('/Register',RegisterRoute);

const Port = process.env.PORT || 5000
app.listen(Port , ()=>{
    console.log(`Server is running on port ${Port}`);
});