import React, { useState,useEffect } from 'react';
import Navbar from './navbar';
import { getAuth, signOut } from "firebase/auth"
import {useNavigate} from 'react-router-dom'

export default function AccountPage(){
    const auth = getAuth();
    const nav = useNavigate();
    var photoURL = localStorage.getItem('photo');
    var userName = localStorage.getItem('user');
    console.log(photoURL)
    
    function LogOut(){
        signOut(auth).then(() => {
            localStorage.clear();
            nav('/');
         }).catch((error) => {
            alert("An Error Has Occured!");
        });
    }

    return(
        <div>
        <Navbar></Navbar>
        <div className = 'h-screen justify-center flex'>
            <img alt="User Profile Picture" src={photoURL || 'Assets/pfp.png'} className='h-1/4 mt-10 w-2/12 relative'/>
            <button className = "mt-96 bg-blue-500 h-10 w-1/12 text-center rounded-lg border-solid border-black border text-black text-lg font-400 fixed" 
            onClick={LogOut}>Logout</button>
        </div>
        
        </div>
    )
}