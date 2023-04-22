import React, { useState, useEffect } from 'react';

interface Props {

}

const Favorite: React.FC<Props> = ({/* Props here */}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`your_api_endpoint?page=${page}`);
    const newData = await response.json();
    setData((prevData) => [...prevData, ...newData]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
        
    </React.Fragment>
  );
};

export default Favorite;