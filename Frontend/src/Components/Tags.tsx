import React, { useState,useEffect, ReactHTMLElement, ChangeEventHandler } from 'react';
import Navbar from './navbar';
import './styles/Tags.css';

export default function TagsPage(){
    var [input, setInput] = useState<Array <String>>([]);
    function HandlePollInput(){
        event?.preventDefault();
        alert(input)   
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
            <div className="flex border-r-4 border-black h-screen w-2/12 justify-center flex-col ">
                <h1 className="text-center text-black font-bold text-3xl mb-auto decoration-solid underline underline-offset-2 decoration-2">Search By Tags</h1>
                <form className='absolute w-1/12 ml-10 mx-auto top-28'>

                <button id="TagButton"onClick={HandlePollInput} className="mt-1 bg-white h-10 w-5/6 text-center rounded-lg border-solid border-black border text-black text-lg font-500">Search</button><br></br>

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