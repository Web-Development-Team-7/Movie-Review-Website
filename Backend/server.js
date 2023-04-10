const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//require('dotenv').config();
//const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const axios= require('axios');
const { get } = require('http');
const request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'));

//Have option to Sign in Without Google, used to encrypt Passwords
const saltRounds = 10;

app.use(cors({
    origin: '*', // allow to server to accept request from different origin
  }));

app.get('/getTop/', async function (req, res) {
    // View all students if no query parameters are provided
    //let students = await Model.find({last_name:req.params.lastname});
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
  params: {
    api_key: '5e072d084652ab8ef66bf80de30d4235',
    language: 'en-US',
    page: 1,
  },
});
const movies = response.data.results.slice(0, 50);
    res.status(200).send(movies);
  
    });





    
    
    app.get('/actors/:movie_id', (req, res) => {
        const MOVIEDB_API_KEY = '5e072d084652ab8ef66bf80de30d4235';
    const MOVIE_ID = req.params.movie_id; // Replace with the ID of the movie you want to get the actors for
      // Make a GET request to the moviedb API to get the cast details for the movie
      request.get(`https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${MOVIEDB_API_KEY}`, (error, response, body) => {
        if (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        const data = JSON.parse(body);
    
        // Extract the list of actors from the API response
        const actors = data.cast.map(actor => actor.name);
    
        // Send the list of actors in the response
        res.send(`Actors in the movie: ${actors.join(', ')}`);
      });
    });




app.listen(5678); //start the server
console.log('Server is running...');