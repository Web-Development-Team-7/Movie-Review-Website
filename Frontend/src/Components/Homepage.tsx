import React, { useState,useEffect } from 'react';
import '../Styles/HomePage.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Navbar from './navbar';



// This interface is used to define the structure of the movie object
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// This function is used to display the homepage of the website
let HomePage = () => {
  // This is the state that is used to store the list of favorites
  const [favoritesList, setFavorites] = useState<Array <Number> >([]);
  // This is the state that is used to store the list of top movies
  const [currentPage, setCurrentPage] = useState(1);
  // This is the state that is used to store the list of top movies
  const [topMovie, setTopMovie]=useState<Movie[]>([]);
  //const[genre, setGenre] = useState([]);
  // This is the state that is used to store the list of top movies 
  //that are currently being displayed
  const itemsPerPage = 10;
  // This is the state that is used to store the list of top movies
  const totalPages = Math.ceil(topMovie.length / itemsPerPage);
  // This is the state that is used to store the list of top movies
  const startIndex = (currentPage - 1) * itemsPerPage;
  // This is the state that is used to store the list of top movies
  const endIndex = startIndex + itemsPerPage;
  // This is the state that is used to store the list of top movies
  const currentItems = topMovie.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * This function is used to retrieve the list of top movies
   * @constructor
   * @param {value} - This is the movie id of the movie that is to be added to the favorites list
   * @param {item} - This is the movie object of the movie that is to be added to the favorites list
   * @param {data} - This is the data that is to be sent to the backend
   * @param {e} - The event that is triggered when the user clicks the remove button
   *  This function is used to remove the movie from the favorites list
   */
  function removeFavLists(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    const value = parseInt(e.currentTarget.value);
    
    let deleteHandler=async ()=>{

        let uid=localStorage.getItem('uid')

        let data={
            uid:uid,
            movieID:value
        }

        const response = await axios.post('http://localhost:5678/deleteFavorites', data);

    }
    setFavorites(favoritesList.filter(item => item !== value));
    deleteHandler();
    //Axios call to remove from backend list
}


/**
 *  This function is called when the user clicks the add button
 * @param value - This is the movie id of the movie that is to be added to the favorites list
 * @param item - This is the movie object of the movie that is to be added to the favorites list
 * @param uid - This is the user id of the user whose favorites are to be retrieved
 */
  let postHandler=async (value: number, item:any)=>{

    let uid=localStorage.getItem('uid')

    let data={
        movie:{
            movieID:value,
            movieDetails:item
        },
        uid:uid
    }

    const response = await axios.post('http://localhost:5678/favorites', data);
    setFavorites([...favoritesList,value]);

  }
  /**
   * @constructor
   * @param e - The event that is triggered when the user clicks the add button
   * @param item - The movie object of the movie that is to be added to the favorites list
   * @param value - The movie id of the movie that is to be added to the favorites list
   *  
   */
  // This function is used to get the top movies from the backend
  function addFavLists(e: React.MouseEvent<HTMLButtonElement>, item:any){
    e.preventDefault();
    console.log(item)
    const value = parseInt(e.currentTarget.value);
    postHandler(value, item);        
  }
    // This function is used to get the top 20 movies from the backend
    /**
     * @constructor
     * @param {response} - This is the response that is received from the backend
     * @param {data} - This is the data that is received from the backend
     * @param {setTopMovie} - This is the state that is used to store the list of top movies
     * 
     */
    const getTop = async () => {
      try {
        const response = await axios.get('http://localhost:5678/getTop');
        console.log(response.data)
        await setTopMovie(response.data);
        console.log(topMovie); // logs the updated state
        console.log(response.data); 
      } catch (error) {
        console.log(error);
      }
    };

  

  useEffect(() => {
    getTop();
  }, []);

  useEffect(()=>{
    /***
     * This function is used to get the favorites from the backend
     * @constructor
     * @param {uid} - This is the user id of the user whose favorites are to be retrieved
     * @param {res} - This is the response that is received from the backend
     * @param {data} - This is the data that is received from the backend
     * @param {setFavorites} - This is the state that is used to store the list of favorites
     * 
     */
    const getFavorites=async ()=>{
      let uid=localStorage.getItem('uid')
      let res= await axios.get('http://localhost:5678/getFavorites/'+uid)
      let data= res.data.map((movie:any) => movie.movieID);
      console.log(data)
      console.log(res)
      setFavorites(data)
     }
     getFavorites()
  },[])
  
  
  return (
<React.Fragment>
  <Navbar/>
  
  <div className="bg-gray-950 h-screen">
  <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Bungee+Shade&display=swap" rel="stylesheet" />

      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-bungee-shade">Top 20 Trending Movies</h1>
    </div>
     
  <div id='moviecontainer'>
  <ul className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-5">
    {topMovie
      .filter(movie => movie.backdrop_path)
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((item, index) => (
        <div key={index} className="relative">
          {favoritesList.includes(item.id) ? (
    <button
      value={item.id}
      onClick={removeFavLists}
      className="bg-red-500 text-center mt-2 h-2/12 text-black justify-center border border-solid border-black hover:ease-in z-10 absolute rounded-md hover:bg-white w-4/12 flex"
    >
      Unfavorite
    </button>
  ) : (
    <button
      value={item.id}
      onClick={(e) => addFavLists(e, item)}
      className="bg-white h-2/12 text-center text-black justify-center mt-2 border border-solid border-black hover:ease-in z-10 absolute rounded-md hover:bg-red-500 hover:text-black w-3/12 flex"
    >
      Favorite
    </button>
  )}
  <Link to={`/details?id=${item.id}`}>
    <img
      src={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`}
      alt={item.title}
      className="photo"
    />
    <div className="absolute bottom-3 left-3 right-3 bg-gray-900 bg-opacity-50 py-10 px-10 text-white transition-opacity duration-300 opacity-0 hover:opacity-100">
      <p className="text-xl font-bold">{item.title}</p>
      <p className="text-sm">{item.release_date}</p>
    </div>
  </Link>

</div>

      ))
    }
  </ul>
  <div className='pagination bg-gray-950 mb-24'>
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={`${
    currentPage === index + 1 ? 'active bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'
  } text-white px-12 py-4 rounded mx-2`}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>

  </div>
</div>


</React.Fragment>

  );
};

export default HomePage;