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

    app.get('/genres', (req, res) => {
      //const genre_id = req.params.genre_id;
      const options = {
        method: 'GET',
        url: 'https://advanced-movie-search.p.rapidapi.com/discover/movie',
        params: {with_genres: '28, 14' , page: '1'},
        headers: {
          'X-RapidAPI-Key': '0a51dbb737msh24f7f6ca1389daep1efa5bjsndcf7ac74473d',
          'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
      };
    
      axios.request(options)
        .then(response => {
          res.send(response.data);
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('Server Error');
        });
    });
    /**
     * MOVIE
    Action          28
    Adventure       12
    Animation       16
    Comedy          35
    Crime           80
    Documentary     99
    Drama           18
    Family          10751
    Fantasy         14
    History         36
    Horror          27
    Music           10402
    Mystery         9648
    Romance         10749
    Science Fiction 878
    TV Movie        10770
    Thriller        53
    War             10752
    Western         37
     */
    app.get('/movies/:query', (req, res) => {
      const options = {
        method: 'GET',
        url: 'https://advanced-movie-search.p.rapidapi.com/search/movie',
        params: {query: req.params.query, page: '1'},
        headers: {
          'X-RapidAPI-Key': '0a51dbb737msh24f7f6ca1389daep1efa5bjsndcf7ac74473d',
          'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
      };
    
      axios.request(options)
        .then(response => {
          res.send(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('Server Error');
        });
    });



app.listen(5678); //start the server
console.log('Server is running...');