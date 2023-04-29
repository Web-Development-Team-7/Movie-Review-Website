import '../Styles/details.css';
import Navbar from "./navbar"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "./details.css"

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





function CommentForm({ movieID }: { movieID: number }) {
  const [comment, setComment] = useState('');
  var uname = localStorage.getItem('user');
  const currentURL = window.location.href;
  const result = currentURL.slice(33);
  var movieID = parseInt(result);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const payload = { movieID, comment, uname };
    if(comment === ''){
        return alert('Please enter a comment')
    }
    console.log(payload)
    var url = 'http://localhost:5678/comment';
    axios.post(url, payload).then((res) => {
        console.log(res)
        event.target.reset();
        alert('Success');
        setComment('');
    }).catch((err) => {
        alert('Error');
        console.log(err.response.data);
    });
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write a comment..." />
      <button type="submit">Submit</button>
    </form>
  );
}
type Comment = {
    _id: number;
    username: string;
    comment: string;
  };
function CommentSection({ movieID }: { movieID: number }) {
    const [comments, setComments] = useState<Comment[]>([]);
  
    function fetchComments(){
        const url = 'http://localhost:5678/comments/'+movieID;
        axios.get(url).then((res) => {
            alert('HI')
            setComments(res.data);
            
      }).catch((err) => {
        alert(err);
      });
    }

    useEffect(() => {
  
      fetchComments();
    }, []);
  
    return (
      <div>
        <h2>Comments</h2>
        {comments.map(comment => (
          <div key={comment._id}>
            <h3>{comment.username}</h3>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    );
  }
  
  
  
  
  
  

// Renders the movie details page of a selected movie
 export default function MoviePage() {
        const [movie, setMovie] = useState<Movie>();
        var id = localStorage.getItem('uid');

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
                    <CommentSection movieID={movie.id}/>
                </section>
                </React.Fragment>
                     <React.Fragment>
            <section id="comment-section">
              <CommentForm movieID={movie.id} />
            </section>
          </React.Fragment>
        </body>
      </React.Fragment>
    )
    else{
        return (
            <>
                <h1>Vladimiar Putin</h1>
            </>
        )
    }
}

