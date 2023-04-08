import React from 'react';
import './styles/login.css'
import {useState} from 'react';
import {Link} from 'react-router-dom'

export default function SignUp(){
    var [user, setUser] = useState('');
    var [password, setPass] = useState('');
    var [verify, setVerify] = useState('');
    
    return(
        <React.Fragment>
           <div className='flex justify-center w-full' id = "SignFlex">
            <form className='bg-white flex relative rounded-md border-solid border-2 w-2/3 border-black h-2/3' id="LogForm">
                <h1 className="text-5xl font-black mt-10">Movitoes - The Movie Database</h1>
                <p className="text-2xl font-medium mt-5">Register</p>
                <input id="Loginput" type = "text"  className= 'bg-slate-200 mt-5 h-10 w-64 rounded-lg text-center' name="Username"  onChange={(e) => setUser(e.target.value)} placeholder = "Enter Username" />
                <input id="Loginput" type = "password" name ="Password" className='bg-slate-200 mt-5 h-10 w-64 rounded-lg text-center'  onChange = {(e) => setPass(e.target.value)} placeholder = "Enter Password"/>
                <input id="Loginput" type = "password" name ="Verify" className='bg-slate-200 mt-5 h-10 w-64 rounded-lg text-center' onChange = {(e) => setVerify(e.target.value)}   placeholder = "Verify Password"/>
                <button id="LogButton" className='mt-10 bg-blue-500 h-10 w-64 text-center rounded-lg border-solid border-black border text-black text-lg font-500 ' >Sign Up</button>
                <button id="GoogleLog" className = "bg-blue-200 rounded-md text-center mt-5 h-10 w-64 font-500 relative">
                    <img src = './Assets/google.png' className='h-10  w-10 top-0 absolute' alt='Google Logo'></img>Sign Up With Google</button>
                <h3 className='mt-3 text-lg font-500'>Have An Account?
                <Link to='/' id="LinkSign" className='text-blue-600 text-lg font-500'>Log In!</Link></h3>
            </form> 
        </div>
        </React.Fragment>
    )
}
