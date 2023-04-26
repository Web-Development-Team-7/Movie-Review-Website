import React from 'react';
import './styles/login.css'
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { EmailAuthCredential, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider} from '../Firebase'

export default function SignUp(){
    //Usestate hooks of user input fields
    var [email, setEmail] = useState('');
    var [password, setPass] = useState('');
    var [verify, setVerify] = useState('');
    const nav = useNavigate();

    /**
    * Takes in a valid email and password input by the user, and registers them in our firebase database of users.
    * Only takes in email and password as users can alternatively sign in with their google accounts, no registration
    * necessary.
    * @constructor
    * @param {email, password} - Data binded to the input of email and password from user
    * @param {createUserWithEmailAndPassword(auth, email, password)} - 
    * Validates that the email and password is valid, then registers the email and password as users.
    * If successful, reroute the user to the login page, if unsuccessful, display the error message in an alert.
    */
    const Register = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        //Prompts user to input all fileds if error.
        if(email === '' || password === ''){
            return alert("Must Fill In All Fields");
        }
        //Added this functionality, checks if pasword verifier matches password.
        if(verify != password){
            return alert('Error - Passwords Must Match')
        }
        //Registers a user with their email and password.
        createUserWithEmailAndPassword(auth, email, password).then((res) =>{
            //Navigates them to login page 
            nav('/');
        }).catch((error) =>{
            //If there was an error, more likely then not user input email incorrectly.
            alert(error.message);
        })
    }

    return(
        <React.Fragment>
           <div className='flex justify-center w-full' id = "SignFlex">
            <form className='bg-white flex relative rounded-md border-solid border-2 w-2/3 border-black h-2/3' id="LogForm">
                <h1 className="text-5xl font-black mt-10">Movitoes - The Movie Database</h1>
                <p className="text-2xl font-medium mt-5">Register</p>
                <input id="Loginput" type = "email"  className= 'bg-slate-200 mt-5 h-10 w-64 rounded-lg text-center' name="Email"  onChange={(e) => setEmail(e.target.value)} placeholder = "Enter Email" />
                <input id="Loginput" type = "password" name ="Password" className='bg-slate-200 mt-5 h-10 w-64 rounded-lg text-center'  onChange = {(e) => setPass(e.target.value)} placeholder = "Enter Password"/>
                <input id="Loginput" type = "password" name ="Verify" className='bg-slate-200 mt-5 h-10 w-64 rounded-lg text-center' onChange = {(e) => setVerify(e.target.value)}   placeholder = "Verify Password"/>
                <button id="LogButton" onClick = {Register} className='mt-10 bg-blue-500 h-10 w-64 text-center rounded-lg border-solid border-black border text-black text-lg font-500 ' >Sign Up</button>
                <h3 className='mt-3 text-lg font-500'>Have An Account?
                <Link to='/' id="LinkSign" className='text-blue-600 text-lg font-500'>Log In!</Link></h3>
            </form> 
        </div>
        </React.Fragment>
    )
}
