import React, { useState,useEffect, ReactHTMLElement, ChangeEventHandler } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import './styles/Tags.css';
import { Link } from 'react-router-dom';

export default function TagsPage(){
    var [input, setInput] = useState<Array <String>>([]);
    var [hasSearch, sethasSearch] = useState(false);
    var [pageNo, setpageNo] = useState(1);
    var [loadTags, SetloadTags] = useState('');
    var [movies, setMovies] = useState<Array<any>>([]);
    var [loading, setLoading] = useState(Boolean);
    var [searched, setSearched] = useState(false); 
    var [favoritesList, setFavorites] = useState<Array <Number> >([]);

    function HandleSearch(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        var tagStr = input.toString();
        setpageNo(pageNo = 1);
        setLoading(true);
        const data = {
            genre_ids: tagStr,
            page: pageNo
        };
        var url = "http://localhost:5678/tags";
        if(input.length === 0){
            return alert("Please Select A Tag")
        }
        
        axios.post(url, data).then((res)=>{
            SetloadTags(tagStr);
            setSearched(true);
            setLoading(false);
            setMovies(res.data.results);
            setpageNo(pageNo = 2);
        }).catch((error) => {
            alert(error.response.data.message)
        });
    }
    
    function updateFavLists(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        const value = parseInt(e.currentTarget.value);
        console.log(value);
        setFavorites([...favoritesList, value]);
        if(favoritesList.includes(value)){
            setFavorites(favoritesList.filter(item => item !== value));
        }
        console.log(favoritesList)
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>){
        var bool = e.target.checked;
        if(bool){
            setInput([...input, e.target.id]);
        }
        else{
            setInput(input.filter(item => item !== e.target.id));
        }
    }

    function ExpandSearch(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        var tagStr = loadTags.toString();
        const data = {
            genre_ids: tagStr,
            page: pageNo
        };
        var url = "http://localhost:5678/tags";
        
        axios.post(url, data).then((res)=>{
            setLoading(false);
            console.log(res.data.results);
            setMovies(movies => [...movies, ...res.data.results])
            console.log(movies)
            setpageNo(pageNo += 1);
        }).catch((error) => {
            alert(error.response.data.message)
        });
    }
    
    return(
        <React.Fragment>
            <div>
                <Navbar></Navbar>
            </div>
            {!searched &&
            <div className="bg-gray-950 ml-60 h-screen ">
                <h1 className="text-white pt-5 text-center text-4xl font-black">Movies</h1>    
            </div>
            }
            {loading &&
            <div className="bg-gray-950 ml-60 h-screen ">
                <h1 className="text-white pt-20 text-3xl font-black">Loading..</h1>
            </div>
            }
            {!loading && movies.length != 0 &&
            <div className="bg-gray-950 ml-60 h-full grid grid-cols-4 gap-2">
                {movies.map(item => {
                    return (
                        <>
                        <div  id ="imgContainter" className="ml-4 mt-2">
                            <img src={item.backdrop_path} alt = "Movie_Picture" id="img" className = "z-1 rounded-md" />
                            <div id="imgDes" className="h-40 bg-gray-900 bg-opacity-50 text-white z-2 transition-opacity duration-300 opacity-0 hover:opacity-100 absolute ">
                                <p className="text-xl font-bold">{item.title}</p>
                                <p className="text-sm">{item.release_date}</p>
                                {favoritesList.includes(item.id) ? <button value = {item.id} onClick={updateFavLists} className="bg-red-500 text-center mt-2 h-2/12 text-black justify-center border border-solid border-black hover:ease-in z-3 absolute rounded-md hover:bg-white w-4/12 flex">Unfavorite</button>
                                :
                                <button value = {item.id} onClick={updateFavLists} className="bg-white h-2/12 text-center text-black justify-center mt-2 border border-solid border-black hover:ease-in z-3 absolute rounded-md hover:bg-red-500 hover:text-black w-3/12 flex">Favorite</button>
                                }
                                <Link to={`/details?id=${item.id}`} className="text-white w-3/12 border border-black border-solid hover:bg-black hover:text-white hover:ease-in text-center absolute mt-10 bg-blue-500 rounded-md">Details</Link>
                            </div>
                        </div>
                        </>
                    );
                    })}
                <button id="LoadMore" onClick={ExpandSearch} className="mt-1 ml-96 bg-blue-500 translate-x-1/2 text-white font-black h-10 w-3/4 justify-center mb-5 text-center rounded-lg border-solid border-black border text-lg font-500">{pageNo}</button>
            </div>
            }
            <div className="flex border-r-4 border-black h-full w-2/12 justify-center flex-col">
                <form className='fixed w-1/12 ml-10 mx-auto top-20'>
                <h1 className="text-center text-black font-black text-3xl ml-10 ">Tags</h1>
                <button id="TagButton"onClick={HandleSearch} className="bg-white h-10 w-5/6 text-center rounded-lg border-solid border-black border text-black text-lg font-500">Search</button><br></br>

                    <input type="checkbox" onChange={handleInput} id="28"/>
                    <label htmlFor="1">Action</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="12"/>
                    <label htmlFor="2">Adventure</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="16"/>
                    <label htmlFor="3">Animation</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="35"/>
                    <label htmlFor="4">Comedy</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="80"/>
                    <label htmlFor="5">Crime</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="99"/>
                    <label htmlFor="6">Documentary</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="18"/>
                    <label htmlFor="7">Drama</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="10751"/>
                    <label htmlFor="8">Family</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="14"/>
                    <label htmlFor="9">Fantasy</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="36"/>
                    <label htmlFor="10">History</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="27"/>
                    <label htmlFor="11">Horror</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="10402"/>
                    <label htmlFor="12">Music</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="9648"/>
                    <label htmlFor="13">Mystery</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="10749"/>
                    <label htmlFor="14">Romance</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="878"/>
                    <label htmlFor="15">Science Fiction</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="10770"/>
                    <label htmlFor="16">TV Movie</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="53"/>
                    <label htmlFor="17">Thriller</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="10752"/>
                    <label htmlFor="18">War</label><br></br>

                    <input type="checkbox" onChange={handleInput} id="37"/>
                    <label htmlFor="19">Western</label><br></br>

                </form>
            </div>
        </React.Fragment>
    )
}