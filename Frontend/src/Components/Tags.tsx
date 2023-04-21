import React, { useState,useEffect, ReactHTMLElement, ChangeEventHandler } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import './styles/Tags.css';

export default function TagsPage(){
    var [input, setInput] = useState<Array <String>>([]);
    var [hasSearch, sethasSearch] = useState<Boolean>(false);
    var [pageNo, setpageNo] = useState<Number>(1);
    var [movies, setMovies] = useState<Array<object>>();

    function HandleSearch(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        var tagStr = input.toString();
        const data = {
            genre_ids: tagStr,
            page: pageNo
        };
        var url = "http://localhost:5678/tags";
        if(input.length === 0){
            return alert("Please Select A Tag")
        }
        axios.post(url, data).then((res)=>{
            setMovies(res.data);
            alert("Success!");
        }).catch((error) => {
            alert(error.response.data.message)
        });
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
    
    return(
        <React.Fragment>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <h1 className="bg-gray-950 ml-60 h-screen relative">Hello World!</h1>
            </div>
            <div className="flex border-r-4 border-black h-full w-2/12 justify-center flex-col ">
                <h1 className="text-center top-0 mt-16 absolute text-black font-bold text-3xl ml-3 decoration-solid underline underline-offset-2 decoration-2">Search By Tags</h1>
                <form className='absolute w-1/12 ml-10 mx-auto top-28'>
                <button id="TagButton"onClick={HandleSearch} className="mt-1 bg-white h-10 w-5/6 text-center rounded-lg border-solid border-black border text-black text-lg font-500">Search</button><br></br>

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