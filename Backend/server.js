const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const axios= require('axios');


//Have option to Sign in Without Google, used to encrypt Passwords
const saltRounds = 10;

const options = {
  method: 'GET',
  url: 'https://online-movie-database.p.rapidapi.com/title/find',
  params: {q: 'game of thrones'},
  headers: {
    'X-RapidAPI-Key': '47d048e09dmsh82922bd4aa60f6ep15bd6bjsnf22dbc12cd4b',
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	// console.log(response.data);
    let data = response.data;
    const filteredData = data.results.filter(obj => obj.titleType === 'tvMovie');

    console.log(filteredData);
}).catch(function (error) {
	console.error(error);
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));

// app.get('/movie/:movie_name', async function(req, res) {
//   console.log(req.params.movie_id);

//   res.status(200).send(data);
//   });

//   app.get('/movies/reviews', async (req, res) => {
//   try {
//     const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//       },
//       params: {
//         categories: 'theater',
//         location: 'Los Angeles', // You can replace Los Angeles with the desired location
//       },
//     });
//     const businesses = response.data.businesses;
//     const reviews = businesses.map((business) => business.rating);
//     res.json(reviews);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });


  // app.listen(5678);
  // console.log('Server is running...');


// async function getMovieData(movieId) {

//   }
  
  // Example usage
  // getMovieData(550) // replace with the movie ID you want to fetch
  //   .then(data => console.log(data))
  //   .catch(error => console.error(error));