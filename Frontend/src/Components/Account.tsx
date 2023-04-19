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
            <img alt="User Profile Picture" src={photoURL || 'Assets/pfp.png'} className='h-48 mt-10 w-48 absolute rounded-full'/>
            <form className='justify-center flex content-center mt-56 flex-col h-96'>
                <input id="" type = "text"  className= 'bg-slate-200  h-10 w-64 rounded-lg text-center' name="text"   placeholder = "Change Username" />
                <button className = "mt-5 bg-blue-500 h-10 ml-10 w-2/3 text-center rounded-lg border-solid border-black border text-white text-sm font-600" 
                >Update User</button>
                <input id="" type = "password"  className= 'bg-slate-200 mt-10 h-10 w-64 rounded-lg text-center' name="text"   placeholder = "Change Password" />
                <button className = "mt-5 bg-white h-10 ml-10 w-2/3 text-center rounded-lg border-solid border-blue-500 border text-black text-sm font-600" 
                >Update Password</button>
                <button className = "mt-10 bg-red-500 h-10 w-2/3 ml-10 text-center rounded-lg border-solid border-black border text-black text-lg font-400" 
                onClick={LogOut}>Delete Account</button>
            </form>
        </div>
        
        </div>
    )
}