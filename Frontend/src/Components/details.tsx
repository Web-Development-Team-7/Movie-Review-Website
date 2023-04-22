import '../Styles/details.css';
import Navbar from "./navbar"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./details.css"

interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

// Dummy data to fill the page for now
// const movieDetails = {
//     poster_path: "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
//     backdrop_path: "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
//     title: "Avengers: Endgame",
//     release_date: "2019-04-24",
//     vote_average: 8.3,
//     vote_count: 10000,
//     genres: ["Action", "Adventure", "Fantasy"],
//     synopsis: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
//     actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson", "Jeremy Renner", "Don Cheadle", "Paul Rudd", "Brie Larson", "Karen Gillan", "Danai Gurira", "Benedict Wong", "Jon Favreau", "Bradley Cooper", "Gwyneth Paltrow", "Josh Brolin"],
//     comments: ["Trash", "BEST THING I'VE EVER SEEN", "Waste of money and time", "Mediocre", "Not too shabby"]
// }
// Renders the movie details page of a selected movie
export default function MoviePage() {
    const [movie, setMovie] = useState<Movie>();
    useEffect(() => {
        const fetchData = async () => {
            const currentURL = window.location.href;
            console.log(currentURL);
            const result = currentURL.slice(33);
            console.log(result)
            let res=await axios.get('http://localhost:5678/movies/'+result)
            console.log(res)
            setMovie(res.data)
        };
        fetchData();
    }, []);

    //   useEffect(() => {
    //     const searchParams = new URLSearchParams(window.location.search);
    //     const myQueryParam = searchParams.get('myQueryParam');
    //     console.log(myQueryParam);
    //   }, [location.search]);

    return (
        // <div>
        //     {movie && (
        //         <div>
        //             <h1>{movie.title}</h1>
        //             <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} style={{ width: 500, height: 600 }} alt={movie.title}  />
        //             <p>{movie.overview}</p>
        //         </div>
        //     )}
        // </div>
        <div className="bg-gray-100 p-6">
  {movie && (
    <div className="bg-white rounded-lg shadow-lg p-6 ">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <center>
      <img 
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
        className="w-64 h-96 rounded-lg shadow-lg mb-4" 
        alt={movie.title}  
      />
      </center>
      
      <p className="text-lg leading-7">{movie.overview}</p>
    </div>
  )}
</div>
    );
    
}
