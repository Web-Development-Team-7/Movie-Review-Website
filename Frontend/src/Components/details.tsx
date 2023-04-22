import '../Styles/details.css';
import Navbar from "./navbar"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

// // Dummy data to fill the page for now
// // const movieDetails = {
// //     poster_path: "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
// //     backdrop_path: "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
// //     title: "Avengers: Endgame",
// //     release_date: "2019-04-24",
// //     vote_average: 8.3,
// //     vote_count: 10000,
// //     genres: ["Action", "Adventure", "Fantasy"],
// //     synopsis: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
// //     actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson", "Jeremy Renner", "Don Cheadle", "Paul Rudd", "Brie Larson", "Karen Gillan", "Danai Gurira", "Benedict Wong", "Jon Favreau", "Bradley Cooper", "Gwyneth Paltrow", "Josh Brolin"],
// //     comments: ["Trash", "BEST THING I'VE EVER SEEN", "Waste of money and time", "Mediocre", "Not too shabby"]
// // }
// // Renders the movie details page of a selected movie
// export default function MoviePage() {
//     const [movie, setMovie] = useState<Movie>();
//     useEffect(() => {
//         const fetchData = async () => {
//             const currentURL = window.location.href;
//             console.log(currentURL);
//             const result = currentURL.slice(33);
//             console.log(result)
//             let res=await axios.get('http://localhost:5678/movies/'+result)
//             console.log(res)
//             setMovie(res.data)
//         };
//         fetchData();
//     }, []);

//     //   useEffect(() => {
//     //     const searchParams = new URLSearchParams(window.location.search);
//     //     const myQueryParam = searchParams.get('myQueryParam');
//     //     console.log(myQueryParam);
//     //   }, [location.search]);

//     return (
//         <div>
//             {movie && (
//                 <div>
//                     <h1>{movie.title}</h1>
//                     <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
//                     <p>{movie.overview}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
const movieDetails = {
    poster_path: "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    title: "Avengers: Endgame",
    release_date: "2019-04-24",
    vote_average: 8.3,
    vote_count: 10000,
    genres: ["Action", "Adventure", "Fantasy"],
    synopsis: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson", "Jeremy Renner", "Don Cheadle", "Paul Rudd", "Brie Larson", "Karen Gillan", "Danai Gurira", "Benedict Wong", "Jon Favreau", "Bradley Cooper", "Gwyneth Paltrow", "Josh Brolin"],
    comments: ["Trash", "BEST THING I'VE EVER SEEN", "Waste of money and time", "Mediocre", "Not too shabby"]
}
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

    if (movie)
    return(
        
        <React.Fragment>
            <Navbar/>
            <body>
                
            <section className="details">
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                </div>
                <section className='info'>    
                    <React.Fragment>
                        <h1 className='text-2xl'>{movie?.title}</h1>
                    </React.Fragment>

                    <React.Fragment>
                    <section id="rating-section">
                        <p>Rating: {movie.vote_average.toFixed(2)}/10</p>
                    </section>
                    </React.Fragment>

                    <React.Fragment>
                        <section id="actor-list">
                            <p>Actors: </p>
                            <ul>
                                {movieDetails.actors.map((actor, index) => (
                                    <li key={index}>{actor}</li>
                                ))}
                            </ul>
                        </section>
                    </React.Fragment>

                    <React.Fragment>
                        <section id="synopsis">
                            <h2>Synopsis: <p>{movie.overview}</p></h2>
                        </section>
                    </React.Fragment>
                </section>
                
                </section>
                
                <React.Fragment>
                <section id="comment-section">
                    
                </section>
                </React.Fragment>
                </body>
        </React.Fragment>
    )
}
// Renders the Name of the movie
// function Name() {
//     return(
//         <React.Fragment>
//             <h1 className='text-2xl'>{movie.title}</h1>
//         </React.Fragment>
//     )
// }
// Renders the comments section
// function Comments() {
//     return(
//         <React.Fragment>
//             <section id="comment-section">

//             </section>
//         </React.Fragment>
//     )
// }
// Renders the ratings of the movie
function Ratings() {
    return(
        <React.Fragment>
            <section id="rating-section">
                <p>Rating: {movieDetails.vote_average}/10</p>
            </section>
        </React.Fragment>
    )
}
// Renders the list of actors
// function ActorList() {
//     return(
//         <React.Fragment>
//             <section id="actor-list">
//                 <p>Actors: </p>
//                 <ul>
//                     {movieDetails.actors.map((actor, index) => (
//                         <li key={index}>{actor}</li>
//                     ))}
//                 </ul>
//             </section>
//         </React.Fragment>
//     )
// }
// Renders the list of genres
function Genres() {
    return(
        <React.Fragment>
            <section id="genre">
                <p>Genres: </p>
                <ul>
                    {movieDetails.genres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                    ))}
                </ul>
            </section>
        </React.Fragment>
    )
}
// Renders the synopsis of the movie
function Synopsis() {
    return(
        <React.Fragment>
            <section id="synopsis">
                <h2>Synopsis: <p>{movieDetails.synopsis}</p></h2>
            </section>
        </React.Fragment>
    )
}
