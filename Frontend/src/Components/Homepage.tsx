import React from 'react';
import { getAuth} from "firebase/auth";

export default function Home(){
    var name = localStorage.getItem('user');  
    //Idea, if user is not signed in, render page that links them back to login page.
    if(name === null){
        return(
            <React.Fragment>
                <h1 className='bg-black text-white'>Login</h1>
            </React.Fragment>
        )
    }
    //If signed in, show normal home page.
    else{
        return(
            <React.Fragment>
                <h1 className='bg-black text-white'>Hello {name}</h1>
            </React.Fragment>
        )}
}