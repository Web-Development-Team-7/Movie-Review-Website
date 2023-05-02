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
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const uri = process.env.mongoURL
console.log(uri)
// This starts the connection to the database
mongoose.connect(uri)

// This is the connection to the database
const dbMongo = mongoose.connection;

// This is the error handling for the connection
dbMongo.on('error', console.error.bind(console, 'connection error:'));

dbMongo.once('open', function() {
  console.log('Connected to MongoDB');
});

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
//This is the schema for the comments
const Comment = mongoose.model('Comment', commentSchema);
/**
 * This is the schema for the movies
 * @constructor
 * @param {Boolean} adult - This is a boolean value that determines if the movie is for adults
 * @param {String} backdrop_path - This is the path to the backdrop image
 * @param {Array} genre_ids - This is an array of the genre ids
 * @param {Number} id - This is the id of the movie
 * @param {String} original_language - This is the original language of the movie
 * @param {String} original_title - This is the original title of the movie
 * @param {String} overview - This is the overview of the movie
 * @param {Number} popularity - This is the popularity of the movie
 * @param {String} poster_path - This is the path to the poster image
 * @param {String} release_date - This is the release date of the movie
 * @param {String} title - This is the title of the movie 
 * @param {Boolean} video - This is a boolean value that determines if the movie has a video
 * @param {Number} vote_average - This is the average vote of the movie
 * @param {Number} vote_count - This is the number of votes for the movie
 * 
 */
const movieSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [Number],
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
});

/**
 * This is the schema for the users
 * @constructor
 * @param {movieID} movieID - This is the id of the movie
 * @param {otherModelField} otherModelField - This is the movieSchema
 * 
 */
const subFavorite = new mongoose.Schema({
  movieID: {
    type: Number,
    required: true
  },
  otherModelField: {
    type: movieSchema,
  }
});

const FavoriteSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  movie:{
    type: [subFavorite],
  },
});
// This is the model for the movies
const Movie = mongoose.model('Movie', movieSchema);
// This is the model for the users
const Favorite = mongoose.model('Favorites', FavoriteSchema);

/**
 * HTTP POST request handler to delete a movie from a user's favorites list
 *
 * @param {Object} req - HTTP request object
 * @param {Object} req.body - HTTP request body object containing userID and movieID
 * @param {string} req.body.uid - userID of the user whose favorites list will be updated
 * @param {string} req.body.movieID - movieID of the movie to be deleted from the user's favorites list
 * @param {Object} res - HTTP response object
 * @throws {Object} err - HTTP error response object
 */
app.post('/deleteFavorites', async function (req, res) {
  try {
    let userID = req.body.uid;
    var movieID= req.body.movieID;
    // console.log(req.body);
    console.log(movieID);
    let doc = await Favorite.findOne({userID:userID});
    // console.log(doc.movie[0])
    let data=[]
    for(let i=0;i<doc.movie.length;i++){
      if(doc.movie[i].movieID!==movieID){
        data.push(doc.movie[i])
      }
    }
    console.log(data)
    doc.movie=data;
    doc.save();
    res.status(200).send(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
/**
 * HTTP POST request handler to add a movie to a user's favorites list
 *
 * @param {Object} req - HTTP request object
 * @param {Object} req.body - HTTP request body object containing userID and movie details
 * @param {string} req.body.uid - userID of the user whose favorites list will be updated
 * @param {Object} req.body.movie - movie details object containing movieID and movieDetails
 * @param {string} req.body.movie.movieID - movieID of the movie to be added to the user's favorites list
 * @param {Object} req.body.movie.movieDetails - movie details object containing details of the movie to be added to the user's favorites list
 * @param {Object} res - HTTP response object
 * @throws {Object} err - HTTP error response object
 */
app.post('/favorites', async function (req, res) {
  try {
    let x = req.body.uid;
    console.log(x);
    console.log(req.body);
    let doc = await Favorite.findOne({ userID: x });
    console.log(doc);
    if (doc === null) {
      console.log("non-existant");
      let favorite = new Favorite({
        userID: x,
        movie: [{
          movieID: req.body.movie.movieID,
          otherModelField: req.body.movie.movieDetails
        }]
      });
      console.log("Before the Save?");
      favorite.save();
      console.log("added?");
      res.status(200).send("created a favorites list");
    } else {
      if (doc.movie.some(m => m.movieID === req.body.movie.movieID)) {
        res.status(200).send("already added to favorites");
      } else {
        console.log("existing");
        doc.movie.push({
          movieID: req.body.movie.movieID,
          otherModelField: req.body.movie.movieDetails
        });
        await doc.save();
        res.status(200).send("updated favorites list");
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
/**

Handles GET request to get favorites of a user with a specific id.
@function
@async
@param {object} req - The HTTP request object.
@param {object} res - The HTTP response object.
@param {string} req.params.uid - The user ID.
@throws {object} Error message if there is an issue getting the user's favorite movie.
@returns {object} The user's favorite movie.
*/
app.get('/getFavorites/:uid', async function (req, res) {
try{
  console.log(req.params.uid)
  let doc = await Favorite.findOne({userID: req.params.uid});
  console.log(doc.movie)
  res.status(200).send(doc.movie)
}catch (err) {
    res.status(400).json({ message: err.message });
  }
})
app.post('/comment', async function (req, res) {
  console.log(req.body);
  const data = await Comment.create({
    username: req.body.uname,
    movieID: req.body.movieID,
    comment: req.body.comment
  });

  try {
    await data.save();
    console.log('hi')
    res.status(201).send("Comment Added");
  } catch (err) {
    console.log('Error')
    res.status(400).json({ message: err.message });
  }
})

/**

Handles GET request to get favorites of a user with a specific id.
@function
@async
@param {object} req - The HTTP request object.
@param {object} res - The HTTP response object.
@param {string} req.params.uid - The user ID.
@throws {object} Error message if there is an issue getting the user's favorite movie.
@returns {object} The user's favorite movie.
*/

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

/**

Retrieves a list of top-rated movies from The Movie Database API.
@route GET /getTop
@returns {Array} An array of movie objects
@throws {Error} 400 - If an error occurs while retrieving data from the API
*/

app.get('/getTop/', async function (req, res) {
  // View all students if no query parameters are provided
  const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: process.env.movieDB_API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
  const movies = response.data.results.slice(0, 50);
  res.status(200).send(movies);
});


/**

Retrieves the list of actors for a given movie ID from the moviedb API.
@param {object} req - The HTTP request object.
@param {object} res - The HTTP response object.
@returns {void}
*/

app.get('/actors/:movie_id', (req, res) => {
  const MOVIEDB_API_KEY = process.env.movieDB_API_KEY
  ;
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
/**

Handle POST request to fetch movies by genre and page number.
@param {Object} req - The request object.
@param {Object} req.body - The request body containing genre_ids and page number.
@param {number} req.body.genre_ids - The genre IDs of the movies to be fetched.
@param {number} req.body.page - The page number of the movies to be fetched.
@param {Object} res - The response object.
@returns {Object} The response object with status and movie data.
*/
app.post('/tags', function (req, res) {
  const genre_id = req.body.genre_ids;
  const page_no = req.body.page;
  const options = {
    method: 'GET',
    url: 'https://advanced-movie-search.p.rapidapi.com/discover/movie',
    params: { with_genres: genre_id, page: page_no },
    headers: {
      'X-RapidAPI-Key': process.env.Rapid_API_KEY,
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
/**
 * GET request to retrieve movie details based on query parameters.
 * @param {string} req.params.query - Query parameter to search for movie details.
 * @returns {Object} Movie details based on query parameters.
 */
app.get('/movies/:query', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://advanced-movie-search.p.rapidapi.com/movies/getdetails',
    params: { movie_id: req.params.query },
    headers: {
      'X-RapidAPI-Key': process.env.Rapid_API_KEY,
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
/**
 * GET request to retrieve search results based on query parameters.
 * @param {string} req.params.movie_name - Query parameter to search for movies.
 * @returns {Object} Movie search results based on query parameters.
 */
app.get('/search/:movie_name', async (req, res) => {
  const movie_name = req.params.movie_name;
  console.log(req.params.movie_name)
  const options = {
    method: 'GET',
    url: 'https://advanced-movie-search.p.rapidapi.com/search/movie',
    params: {
      //query: 'Avengers',
      query: movie_name,
      page: '1'
    },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': process.env.Rapid_API_KEY,
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