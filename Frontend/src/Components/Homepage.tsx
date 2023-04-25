import React, { useState,useEffect } from 'react';
import '../Styles/HomePage.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Navbar from './navbar';

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

let HomePage = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [topMovie, setTopMovie]=useState<Movie[]>([]);
  //const[genre, setGenre] = useState([]);
  const itemsPerPage = 4;
  
  const totalPages = Math.ceil(topMovie.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = topMovie.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  
  
  useEffect(() => {
    console.log(topMovie);
  }, [topMovie]);
  
  return (
<React.Fragment>
  <Navbar/>

 
  <div id='moviecontainer'>
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    {topMovie
      .filter(movie => movie.backdrop_path)
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((item, index) => (
        <div key={index} className="relative">
          <Link to= {`/details?id=${item.id}`}>
            <img src={`https://image.tmdb.org/t/p/w400/${item.backdrop_path}`} alt={item.title} className="photo"/>

          <div className="absolute bottom-3 left-3 right-3 bg-gray-900 bg-opacity-50 py-20 px-6 text-white transition-opacity duration-300 opacity-0 hover:opacity-100">
            <p className="text-xl font-bold">{item.title}</p>
            <p className="text-sm">{item.release_date}</p>
          </div>
          </Link>
        </div>
      ))
    }
  </ul>
</div>


  <div className='pagination'>
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={`${
    currentPage === index + 1 ? 'active bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'
  } text-white px-4 py-2 rounded mx-2`}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>
</React.Fragment>

  );
};

export default HomePage;