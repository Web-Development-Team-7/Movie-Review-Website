import React from 'react';
import './styles/login.css'
import {useState} from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword  } from 'firebase/auth';
import { auth, provider} from '../Firebase'
import {Link, useNavigate} from 'react-router-dom';

export default function Login(){
    //UseState hooks of user input fields.
    var [email, setEmail] = useState('');
    var [password, setPass] = useState('');
    const nav = useNavigate();
    
    //Sign in with google authentication
    const GoogleSignIn = () =>{
        event?.preventDefault();
        //Open a pop up tab that allows users to sign in with user accounts
        signInWithPopup(auth, provider).then((res) =>{
            //Use the google account displayName as the account name.
            const user = res.user.displayName;
            const profile = res.user.photoURL;
            //If statement exists because typescript is unsure if user is null or not
            if(user && profile){
                //If the user does exist, set the users name in the storage to verify a user is logged in.
                localStorage.setItem("user", user);
                localStorage.setItem("photo", profile);
                //Navigate to home page.
                nav('/home');
            }     
        }).catch((error) =>{
            alert(error.message);
        })
    }

    //If user wants to sign in with just email and password.
    const UserSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        //Check if user input fields correctly.
        if(email === '' || password === ''){
            return alert("Must Fill In All Fields");
        }
        //If successful, set the user as the email name. Will add option in future to update display name.
        //Otherwise, same function as above.
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) =>{
            localStorage.setItem("user", email);
            nav('/home');
        }).catch((error) => {
            alert(error.message)
        })
    }

    return(
        <React.Fragment>
           <div className='flex justify-center w-full' id = "LogFlex">
            <form className='bg-white flex relative rounded-md border-solid border-2 w-1/3 border-black h-4/5' id="LogForm">
                <h1 className="text-3xl font-bold mt-10">Welcome</h1>
                <p className="text-2xl font-medium mt-10">Log In</p>
                <input id="Loginput" type = "email"  className= 'bg-slate-200 mt-10 h-10 w-64 rounded-lg text-center' name="Email"  onChange={(e) => setEmail(e.target.value)} placeholder = "Enter Email" />
                <input id="Loginput" type = "password" name ="Password" className='bg-slate-200 mt-5 h-10 w-64 rounded-lg text-center'  onChange = {(e) => setPass(e.target.value)} placeholder = "Enter Password"/>
                <button id="LogButton" onClick={UserSignIn} className='mt-10 bg-blue-500 h-10 w-64 text-center rounded-lg border-solid border-black border text-black text-lg font-500 ' >Log In</button>
                <button id="GoogleLog" onClick={GoogleSignIn} className = "bg-white rounded-md text-center mt-96 h-10 w-48 font-500 absolute z-10 border-black border border-solid">
                    <img src = './Assets/google.png' className='h-15 w-8 top-1 absolute' alt='Google Logo'></img>Log In With Google</button>
                <h3 className='mt-20'>Don't Have An Account?
                <Link to='/Signup' id="LinkSign" className='text-blue-600'>Sign Up!</Link></h3>
            </form>
        </div>
        </React.Fragment>
    )
}