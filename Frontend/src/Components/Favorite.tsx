import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorite=()=>{
  let [favoritesList, setFavoritesList]=useState([])

  useEffect(()=>{
    let uid=localStorage.getItem('uid')
    let getFavoriteHandler=async()=>{
      let res = await axios.get('http://localhost:5678/getFavorites/'+uid);
      setFavoritesList(res.data);
      console.log(res.data)
    }
    getFavoriteHandler()
  },[])

  return(
    <React.Fragment>
      
    </React.Fragment>
  )
}
export default Favorite