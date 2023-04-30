import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Navbar from "./navbar";
import { Link, useNavigate} from 'react-router-dom';
import { getAuth } from "firebase/auth";
import './styles/search.css'

export default function SearchResults() {
    //Used to authenticate if the user is logged in before making any api request
    const auth = getAuth();
    const user = auth.currentUser;
    //Used to redirect users if not logged in
    const nav = useNavigate();
    //Holds movie json objects
    var [movies, setMovies] = useState<Array<any>>([]);
    // Does request to backend to get movies that match the search query
    //List of favorite movies of user
    var [favoritesList, setFavorites] = useState<Array <Number> >([]);
    
    useEffect(() => {
        const getFavorites=async ()=>{
            let uid=localStorage.getItem('uid')
            let res= await axios.get('http://localhost:5678/getFavorites/'+uid)
            let data= res.data.map((movie:any) => movie.movieID);
            console.log(data)
            console.log(res)
            setFavorites(data)
           }
        const fetchData = async () => {
            const currentURL = window.location.href;
            console.log(currentURL);
            const result = currentURL.slice(31);
            console.log(result)
            var url = 'http://localhost:5678/search/'+result;
            let res=await axios.get(url)
            //var filteredRes = res.data.results.filter(function (movie) { return movie.original_language === 'en' })
            console.log(res.data.results.filter(function (movie:any) { return movie.original_language === 'en' }))
            setMovies(res.data.results.filter(function (movie:any) { return movie.original_language === 'en' && movie.backdrop_path != "https://image.tmdb.org/t/p/originalnull" }));
        };
        fetchData();
        getFavorites();
    }, []);

    

    /**
    * Removes movie id from favorites list in mongodb and frontend copy.
    * @constructor
    * @param {value} - Variable that holds the integer value of the movie id of the user wishes to add.
    * @param {favoritesList} - Variable that holds the movie ids of that the user has added to their favorite lists. 
    * @param {user} - This variable verifies if the user is logged in or not, if it is null, the user is not logged in
    *  and therefore, no api requests will be allowed.
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
    * Adds movie IDs to the favorite list in mongodb.
    * @constructor
    * @param {value} - Variable that holds the integer value of the movie id of the user wishes to add.
    * @param {favoritesList} - Variable that holds the movie ids of that the user has added to their favorite lists.
    * @param {user} - This variable verifies if the user is logged in or not, if it is null, the user is not logged in
    *  and therefore, no api requests will be allowed.
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
      function addFavLists(e: React.MouseEvent<HTMLButtonElement>, item:any){
        e.preventDefault();
        console.log(item)
        const value = parseInt(e.currentTarget.value);
        postHandler(value, item);        
      }
     

    return(
        <React.Fragment>
            <div>
                <Navbar/>
            </div>
            <div className="search-results bg-gray-950 h-full grid grid-cols-4 gap-2">
                {movies.map(item => {
                    return (
                        <>
                            <div id="results-container" className="">
                                <img src={item.backdrop_path} alt="Movie Picture" id="img" className="z-1 rounded-md" />
                                <div id="resDes">
                                    <p className="text-white text-xl font-bold">{item.title}</p>
                                    <p className="text-white text-sm">{item.release_date}</p>
                                    {favoritesList.includes(item.id) ? <button value = {item.id} onClick={removeFavLists} className="bg-red-500 text-center mt-2 h-2/12 text-black justify-center border border-solid border-black hover:ease-in z-3 absolute rounded-md hover:bg-white w-4/12 flex">Unfavorite</button>
                                    :
                                    <button value = {item.id} onClick={(e) => addFavLists(e,item)} className="bg-white h-2/12 text-center text-black justify-center mt-2 border border-solid border-black hover:ease-in z-3 absolute rounded-md hover:bg-red-500 hover:text-black w-3/12 flex">Favorite</button>
                                    }
                                    <Link to={`/details?id=${item.id}`} className="text-white w-3/12 border border-black border-solid hover:bg-black hover:text-white hover:ease-in text-center relative  bg-blue-500 rounded-md">Details</Link>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </React.Fragment>
    )
}