import '../Styles/details.css';
import Navbar from "./navbar"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "./details.css"

//This interface is used to define the structure of the movie object
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


/**
 * Renders the movie details page of a selected movie
 * @constructor
 * @param {Movie} movie - The movie object that contains all the details of the movie
 * @param {number} id - The id of the movie
 * @param {string} title - The title of the movie
 * @param {string} release_date - The release date of the movie
 * @param {number} vote_average - The average vote of the movie
 * @param {number} vote_count - The number of votes of the movie
 * @param {string[]} genres - The genres of the movie
 * @param {string} synopsis - The synopsis of the movie
 * @param {string[]} actors - The actors of the movie
 * 
 * @returns 
 */
 export default function MoviePage() {  
        //This is the state that stores the movie object
        const [movie, setMovie] = useState<Movie>();
        //This is the state that stores the id of the movie
        var id = localStorage.getItem('uid');
         //This is the state that stores the comments array
        type Comment = {
            _id: number;
            username: string;
            comment: String;
          };
          
            //This is the state that stores the loading state of the page
            const currentURL = window.location.href;
            //This is the state that stores the result of the current URL
            const result = currentURL.slice(33);
            //This is the state that stores the id of the movie
            var movieID = parseInt(result);
            //This is the state that stores the comments array
            const [comments, setComments] = useState<Comment[]>([]);
            //This is the state that stores the loading state of the page
            const [loading, setLoading] = useState<boolean>(true);
            //This is the state that stores the actors array
            const [actors,setActors]=useState<Array <string> >([]);
          
            /**
             * This function is used to fetch the movie details from the backend
             * @constructor
             * @param {movieID} - The id of the movie
             * @param {setLoading} - The loading state of the page
             * @param {setComments} - The comments array
            */
            function fetchComments(){
                setLoading(true);
                console.log(setLoading)
                const url = 'http://localhost:5678/comments/'+movieID;
                axios.get(url).then((res) => {
                    //alert('HI')
                    setComments(res.data);
                    setLoading(false);
              }).catch((err) => {
                alert(err);
              });
            }
        
            useEffect(() => {
          
              fetchComments();
            }, []);
          
           
          
    /**
     * This function is used to fetch the movie details from the backend
     * @constructor
     * @param {movieID} - The id of the movie
     * @param {comment} - The comment of the movie
     * @param {uname} - The username of the user
     * @param {result} - The result of the current URL
     * @returns 
     */
    function CommentForm({ movieID }: { movieID: number }) {
  const [comment, setComment] = useState<String>('');
  var uname = localStorage.getItem('user');
  const currentURL = window.location.href;
  const result = currentURL.slice(33);
  var movieID = parseInt(result);

  /**
   * 
   * @param {event} - The event of the form
   * @param {payload} - The payload of the form data
   * @param {x} - The object that contains the comment data to be added to the comments array
   * @param {setComments} - The function that sets the comments array
   * @param {setComment} - The function that sets the comment
   * @param {url} - The url of the backend
   * @param {comment} - The comment of the movie
   * 
   * @returns 
   */

  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const payload = { movieID, comment, uname };
    if(comment === ''){
        return alert('Please enter a comment')
    }
    const x = {
        _id: 0,
        username: uname,
        movieID: movieID,
        comment: comment,
        _v: 0
    }
    console.log(payload)
    var url = 'http://localhost:5678/comment';
    axios.post(url, payload).then((res) => {
        console.log(x)
        event.target.reset();
        setComments(comments => [...comments, x]);
        //alert('Success');
        setComment('');
    }).catch((err) => {
        alert('Error');
        console.log(err.response.data);
    });
    
  };

  return (
<div className="flex mx-auto items-center justify-center shadow-lg mt-10 mx-8 mb-4 max-w-md">
   <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
         <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
         <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body"value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write a comment..."></textarea>
         </div>
         <div className="w-full md:w-full flex items-start md:w-full px-3">
            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
            </div>
            <div className="-mr-1">
               <button className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" type="submit">Post Comment</button>
            </div>
         </div>
         </div>
      </form>
   </div>
   

  );
}

    useEffect(() => {
        /**
         * This function is used to fetch the movie details from the backend
         * @constructor
         * @param {currentURL} - The current URL of the page
         * @param {result} - The result of the current URL
         * @param {res} - The response of the backend
         * @param {setMovie} - The function that sets the movie
         * 
         * 
         */
        const fetchData = async () => {
            const currentURL = window.location.href;
            console.log(currentURL);
            const result = currentURL.slice(33);
            console.log(result)
            let res=await axios.get('http://localhost:5678/movies/'+result)
            console.log(res)
            setMovie(res.data)
        };
        /**
         * This function is used to fetch the actors of the movie from the backend
         * @constructor
         * @param {result} - The result of the current URL
         * @param {res} - The response of the backend
         * @param {setActors} - The function that sets the actors
         * 
         */
        const getActors=async ()=>{
            let res=await axios.get('http://localhost:5678/actors/'+result)
            setActors(res.data.split(", "));
            console.log(res.data.split(", "))
        }
        getActors();
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
                        <div>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Bungee+Shade&display=swap" rel="stylesheet" />
                        <h1 className='text-2xl'>{movie?.title}</h1>

                        </div>
                   
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
                                {actors.map((actor, index) => (
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
                <div id="comment-section">
                    <CommentForm movieID={movie.id} />
                    <div className="bg-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Comments</h2>
            {loading ? (
        <p>Loading comments...</p>
      ) : (
            comments.map(comment => (
            <div className="flex flex-col space-y-4" key={comment._id}>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">{comment.username}</h3>
                    <p className="text-gray-700 text-sm mb-2">{comment.comment}</p>
                    
                </div>
            </div>
            ))
                
      )}</div>
                </div>
                </React.Fragment>
            <React.Fragment>
            
          </React.Fragment>
        </body>
      </React.Fragment>
    )

}