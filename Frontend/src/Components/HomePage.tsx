import React, { useState } from 'react';
import '../Styles/HomePage.css';

let HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const arr: string[] = ['Movie1', 'Movie2', 'Movie3', 'Movie4', 'Movie5', 'Movie6'];

  const totalPages = Math.ceil(arr.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = arr.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
        <h1>Home Page</h1>
        <div id='moviecontainer'>
            <ul>
            {currentItems.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
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
