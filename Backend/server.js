const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');

//Have option to Sign in Without Google, used to encrypt Passwords
const saltRounds = 10;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));