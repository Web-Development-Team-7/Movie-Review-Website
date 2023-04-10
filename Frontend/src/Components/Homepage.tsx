import React, { useState,useEffect } from 'react';
import '../Styles/HomePage.css';
import axios from 'axios'

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
  const itemsPerPage = 5;
  
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
      await setTopMovie(response.data);
      console.log(topMovie); // logs the updated state
      // console.log(response.data); 
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
  <h1>Home Page</h1>

  <div id='moviecontainer'>
    <ul>
      {topMovie
        .filter(movie => movie.backdrop_path)
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item, index) => (
          <div key={index}>
            <img src={`https://image.tmdb.org/t/p/w200/${item.backdrop_path}`} alt={item.title} />
          </div>
        ))
      }
    </ul>
  </div>

  <div className='pagination'>
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={currentPage === index + 1 ? 'active' : ''}
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
