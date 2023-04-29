const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const axios = require('axios');
const { get } = require('http');
const request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'));

app.use(cors({
  origin: '*', // allow to server to accept request from different origin
}));

// This sets uri to the mongoURL in the .env file
const uri = process.env.mongoURL
// This starts the connection to the database
mongoose.connect(uri)

// This is the connection to the database
const dbMongo = mongoose.connection;

// This is the error handling for the connection
dbMongo.on('error', console.error.bind(console, 'connection error:'));
dbMongo.once('open', function () {
  console.log('Connected to MongoDB');
});

// This is the schema for the comment database
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  movieID: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }
})

// Model for the comment data
const Comment = mongoose.model('Comment', commentSchema);

app.post('/comment', async function (req, res) {
  //console.log(req.body);
  const data = await Comment.create({
    username: req.body.uname,
    movieID: req.body.movieID,
    comment: req.body.comment
  });
  try {
    await data.save();
    console.log('hi')
    res.status(201).send("jomama");
  } catch (err) {
    console.log('bye')
    res.status(400).json({ message: err.message });
  }
})

app.get('/comments/:movieID', async function(req, res) {
  var com = Comment;
  try {
    console.log(req.params.movieID)
    const comments = await com.find({ movieID: req.params.movieID });
    console.log(comments);
    return res.status(200).send(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Have option to Sign in Without Google, used to encrypt Passwords
const saltRounds = 10;

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
    const limitedActors = actors.slice(0, 20);

    // Convert the limited list of actors to a comma-separated string
    let actorList = limitedActors.join(', ');
    // Send the list of actors in the response
    res.send(JSON.stringify(actorList));
  });
});

app.post('/tags', function (req, res) {
  const genre_id = req.body.genre_ids;
  const page_no = req.body.page;
  const options = {
    method: 'GET',
    url: 'https://advanced-movie-search.p.rapidapi.com/discover/movie',
    params: { with_genres: genre_id, page: page_no },
    headers: {
      'X-RapidAPI-Key': '0a51dbb737msh24f7f6ca1389daep1efa5bjsndcf7ac74473d',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };
  axios.request(options)
    .then(response => {
      res.status(200).send(response.data);
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
    url: 'https://advanced-movie-search.p.rapidapi.com/movies/getdetails',
    params: { movie_id: req.params.query },
    headers: {
      'X-RapidAPI-Key': '0a51dbb737msh24f7f6ca1389daep1efa5bjsndcf7ac74473d',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    //console.log(response.data);
    res.send(response.data);
  }).catch(function (error) {
    console.error(error);
  });
});

app.post('/movies', async (req, res) => {
  const movie_name = req.params.movie_name;
  const options = {
    method: 'GET',
    url: 'https://advanced-movie-search.p.rapidapi.com/search/movie',
    params: {
      query: 'Avengers',
      // query: movie_name,
      page: '1'
    },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '0a51dbb737msh24f7f6ca1389daep1efa5bjsndcf7ac74473d',
      'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching movies.');
  }
});



app.listen(5678); //start the server
console.log('Server is running...');