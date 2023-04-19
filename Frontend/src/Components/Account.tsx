import React, { useState,useEffect } from 'react';
import Navbar from './navbar';
import { getAuth, signOut, updateProfile, updatePassword, deleteUser } from "firebase/auth"
import {useNavigate} from 'react-router-dom'
import './styles/Account.css'

export default function AccountPage(){
    const auth = getAuth();
    const nav = useNavigate();
    var photoURL = localStorage.getItem('photo');
    var [uname, setUname] = useState('');
    
    useEffect(() => {
        var temp = localStorage.getItem('user');
        if(temp){
        setUname(temp);
        }
      }, []);
    console.log(photoURL)

    var [ChangeUser, setChangeUser] = useState('');
    var [ChangePass, setChangePass] = useState('');
    
    function LogOut(){
        signOut(auth).then(() => {
            localStorage.clear();
            nav('/');
         }).catch((error) => {
            alert("An Error Has Occured!");
        });
    }

    function UpdateUser(){
        event?.preventDefault();
        if(ChangeUser === ''){
            return alert("Please Fill In Valid Value!");
        }
        const user = auth.currentUser;
        
        if(user!== null){
        updateProfile(user, {
            displayName: ChangeUser
          }).then(() => {
            alert("Update Successful!");
            setUname(ChangeUser);
          }).catch((error) => {
            alert(error.message);
          });
        }
    }

    function UpdatePassword(){
        event?.preventDefault();
        if(ChangePass === ''){
            return alert("Please Fill In Valid Value!");
        }
        const user = auth.currentUser;
        
        if(user!== null){
            updatePassword(user, ChangePass).then(() => {
                alert("Success");
              }).catch((error) => {
                alert(error.message)
              });
            }
    }

    return(
        <div>
        <Navbar></Navbar>
        <div className = 'h-screen justify-center flex'>
            <img alt="User Profile Picture" src={photoURL || 'Assets/pfp.png'} className='h-48 mt-10 w-48 absolute rounded-full'/>
            <h1 className='text-3xl font-bold text-center absolute text-black mt-60'>{uname}</h1>
            <form className='justify-center flex content-center mt-56 flex-col h-96'>
                <input id="Loginput" type = "text"  className= 'bg-slate-200 mt-20  h-10 w-64 rounded-lg text-center' name="text"   placeholder = "Change Username" 
                onChange={(e) => setChangeUser(e.target.value)}/>
                <button id="UserChange" className = "mt-5 bg-blue-500 h-10 ml-10 w-2/3 text-center rounded-lg border-solid border-black border text-white text-sm font-600" 
                onClick={UpdateUser}>Update User</button>
                <input id="Loginput" type = "password"  className= 'bg-slate-200 mt-10 h-10 w-64 rounded-lg text-center' name="text"   placeholder = "Change Password" 
                onChange={(e) => setChangePass(e.target.value)}/>
                <button id='PassChange' onClick={UpdatePassword} className = "mt-5 bg-white h-10 ml-10 w-2/3 text-center rounded-lg border-solid border-blue-500 border text-black text-sm font-600" 
                >Update Password</button>
                <button id="DelAccount" className = "mt-10 bg-red-500 h-10 w-2/3 ml-10 text-center rounded-lg border-solid border-black border text-black text-lg font-400" 
                onClick={LogOut}>Delete Account</button>
            </form>
        </div>
        </div>
    )
}