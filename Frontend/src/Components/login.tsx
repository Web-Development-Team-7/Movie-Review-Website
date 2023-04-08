import React from 'react';
import './styles/login.css'
import {useState} from 'react';
import { GoogleSignIn } from '../Firebase';
import {Link} from 'react-router-dom'

export default function Login(){
    var [user, setUser] = useState('');
    var [password, setPass] = useState('');
    
    return(
        <React.Fragment>
           <div className='flex justify-center w-full' id = "LogFlex">
           <button id="GoogleLog" onClick={GoogleSignIn} className = "bg-white rounded-md text-center mt-40 h-10 w-48 font-500 absolute z-10 border-black border border-solid">
                    <img src = './Assets/google.png' className='h-15 w-8 top-1 absolute' alt='Google Logo'></img>Log In With Google</button>
            <form className='bg-white flex relative rounded-md border-solid border-2 w-1/3 border-black h-4/5' id="LogForm">
                <h1 className="text-3xl font-bold mt-10">Welcome</h1>
                <p className="text-2xl font-medium mt-10">Log In</p>
                <input id="Loginput" type = "text"  className= 'bg-slate-200 mt-10 h-10 w-64 rounded-lg text-center' name="Username"  onChange={(e) => setUser(e.target.value)} placeholder = "Enter Username" />
                <input id="Loginput" type = "password" name ="Password" className='bg-slate-200 mt-5 h-10 w-64 rounded-lg text-center'  onChange = {(e) => setPass(e.target.value)} placeholder = "Enter Password"/>
                <button id="LogButton" className='mt-10 bg-blue-500 h-10 w-64 text-center rounded-lg border-solid border-black border text-black text-lg font-500 ' >Log In</button>
                <h3 className='mt-20'>Don't Have An Account?
                <Link to='/Signup' id="LinkSign" className='text-blue-600'>Sign Up!</Link></h3>
            </form>
        </div>
        </React.Fragment>
    )
}