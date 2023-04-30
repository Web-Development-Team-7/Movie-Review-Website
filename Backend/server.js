const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const axios= require('axios');
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
  userID: {
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
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  }
})
const Comment = mongoose.model('Comment', commentSchema);
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

const Movie = mongoose.model('Movie', movieSchema);
const Favorite = mongoose.model('Favorites', FavoriteSchema);

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
  const comment = new Comment({
    commentID: req.body.commentID,
    userID: req.body.userID,
    movieID: req.body.movieID,
    comment: req.body.comment,
    date: req.body.date,
    likes: req.body.likes
  });
  try{
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

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
        params: {with_genres: genre_id , page: page_no},
        headers: {
          'X-RapidAPI-Key': 'f7b66bb4a3mshb21dfc9604496ebp163455jsn1c8776f87de3',
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
        params: {movie_id: req.params.query},
        headers: {
          'X-RapidAPI-Key': 'f7b66bb4a3mshb21dfc9604496ebp163455jsn1c8776f87de3',
          'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
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
          query: 'Mar',
          // query: movie_name,
          page: '1'
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': 'f7b66bb4a3mshb21dfc9604496ebp163455jsn1c8776f87de3',
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