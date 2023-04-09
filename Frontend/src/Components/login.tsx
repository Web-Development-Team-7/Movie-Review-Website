import React from 'react';
import '../Styles/login.css'
import {useState} from 'react';

export default function Login(){
    var [user, setUser] = useState('');
    var [password, setPass] = useState('');
    
    return(
        <React.Fragment>
           <div className='flex justify-center w-full' id = "LogFlex">
            <form className=''>
                <h1>Welcome</h1>
                <p className="lg">Log In</p>
                <input id="Loginput" type = "text"  className= 'bg-slate-200' name="Username"  onChange={(e) => setUser(e.target.value)} placeholder = "Enter Username" />
                <input id="Loginput" type = "password" name ="Password" className='bg-slate-200'  onChange = {(e) => setPass(e.target.value)} placeholder = "Enter Password"/>
                <button> Sign In With Google</button>
                <button >Log in</button>
            </form>
        </div>
        </React.Fragment>
    )
}