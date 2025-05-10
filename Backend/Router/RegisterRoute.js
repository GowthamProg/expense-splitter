const express = require('express');
const route = express();
const {RegisterUser} = require('../Controller/RegisterControl');

route.post('/',RegisterUser);

module.exports = route;