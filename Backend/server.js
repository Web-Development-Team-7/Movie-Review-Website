const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//require('dotenv').config();
//const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const axios = require("axios");

//Have option to Sign in Without Google, used to encrypt Passwords
const saltRounds = 10;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));



const options = {
    method: 'GET',
    url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
    params: { q: 'mario', qid: 'movie' },
    headers: {
        'X-RapidAPI-Key': '0a51dbb737msh24f7f6ca1389daep1efa5bjsndcf7ac74473d',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
};

// const filteredData = response.data.filter(obj => obj.qid === 'movie');

// console.log(filteredData);

axios.request(options).then(function (response) {
    //console.log(response.data);
    let data = response.data;
    const filteredData = data.d.filter(obj => obj.qid === 'movie');

    console.log(filteredData);

}).catch(function (error) {
    console.error(error);
});

const options2 = {
    method: 'GET',
    url: 'https://online-movie-database.p.rapidapi.com/title/get-most-popular-movies',
    params: {currentCountry: 'US', purchaseCountry: 'US', homeCountry: 'US'},
    headers: {
      'X-RapidAPI-Key': '0a51dbb737msh24f7f6ca1389daep1efa5bjsndcf7ac74473d',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  };
  
  axios.request(options2).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });