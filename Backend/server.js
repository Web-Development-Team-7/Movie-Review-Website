const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//require('dotenv').config();
//const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const axios= require('axios');
const { get } = require('http');

//Have option to Sign in Without Google, used to encrypt Passwords
const saltRounds = 10;

// const options2 = {
//   method: 'GET',
//   url: 'https://online-movie-database.p.rapidapi.com/title/get-most-popular-movies',
//   params: {currentCountry: 'US', purchaseCountry: 'US', homeCountry: 'US'},
//   headers: {
//     'X-RapidAPI-Key': '0a51dbb737msh24f7f6ca1389daep1efa5bjsndcf7ac74473d',
//     'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
//   }
// };

// axios.request(options2).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });

let getTop50=async ()=>{
const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
  params: {
    api_key: '5e072d084652ab8ef66bf80de30d4235',
    language: 'en-US',
    page: 1,
  },
});
const movies = response.data.results.slice(0, 50);
console.log(movies)
}
getTop50()

// axios.get(`http://www.omdbapi.com/?i=tt0031885&apikey=a502ab9b`)
//   .then(response => {
//     const movie = response.data;
//     console.log(movie);
//   })
//   .catch(error => {
//     console.error(error);
//   });