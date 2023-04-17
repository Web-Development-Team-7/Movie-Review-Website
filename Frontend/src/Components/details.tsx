import '../Styles/details.css';
import React from "react"
import Navbar from "./navbar"


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

export default function MoviePage() {
    return(
        <React.Fragment>
            <Navbar/>
            
            <body>
            <section className="details">
                <img src={movieDetails.backdrop_path} alt={movieDetails.title} />
                <section className='info'>    
                    <Name/>
                    <Ratings/>
                    <ActorList/>
                    <Genres/>
                    <Synopsis/>
                </section>
            </section>
            <Comments/>
            </body>
        </React.Fragment>
    )
}

function Name() {
    return(
        <React.Fragment>
            <h1>{movieDetails.title}</h1>
        </React.Fragment>
    )
}

function Comments() {
    return(
        <React.Fragment>
            <section id="comment-section">

            </section>
        </React.Fragment>
    )
}

function Ratings() {
    return(
        <React.Fragment>
            <section id="rating-section">
                <p>Rating: {movieDetails.vote_average}/10</p>
            </section>
        </React.Fragment>
    )
}

function ActorList() {
    return(
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
    )
}

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

function Synopsis() {
    return(
        <React.Fragment>
            <section id="synopsis">
                <h2>Synopsis: <p>{movieDetails.synopsis}</p></h2>
            </section>
        </React.Fragment>
    )
}