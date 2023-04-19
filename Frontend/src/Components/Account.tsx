import React, { useState,useEffect } from 'react';
import Navbar from './navbar';
import { getAuth, signOut, updateProfile, updatePassword, deleteUser } from "firebase/auth"
import {useNavigate} from 'react-router-dom'
import './styles/Account.css'

export default function AccountPage(){
    const auth = getAuth();
    const nav = useNavigate();
    //The photo URL that will be displayed to the user
    var [photoURL, setPhotoURL] = useState('');
    //Will be used to update the photo displayed
    var [updatePhoto, setUpdatePhoto] = useState('');
    //Display the username in frontend
    var [uname, setUname] = useState('');
    //Toggle the screen overlay to change photo
    var [toggleChoose, setChangeImage] = useState(false);

    //On page load, set the username and photo attributes
    useEffect(() => {
        //Use temporary values, and use if statements incase values are null.
        var temp = localStorage.getItem('user');
        var temp2 = localStorage.getItem('photo');
        if(temp && temp2){
            setUname(temp);
            setPhotoURL(temp2);
        }
      }, []);

    //useState hook to take input of user profile changes
    var [ChangeUser, setChangeUser] = useState('');
    var [ChangePass, setChangePass] = useState('');
    
    //Handles logout when user has been inactive for a period of time
    function LogOut(){
        signOut(auth).then(() => {
            //Clears local storage of user information such as name and pfp.
            localStorage.clear();
            nav('/');
         }).catch((error) => {
            alert(error.message);
        });
    }

    //Function that takes in username input, and updates it in firebase
    function UpdateUser(event: React.MouseEvent<HTMLButtonElement>){
        event?.preventDefault();
        //If the username hook has not been changed, return an error
        if(ChangeUser === ''){
            return alert("Please Fill In Valid Value!");
        }
        const user = auth.currentUser;
        
        //Checks if the user is not null to prevent errors
        if(user!== null){
        //Updates username, and updates the display variable in frontend
        updateProfile(user, {
            displayName: ChangeUser
          }).then(() => {
            alert("Update Successful!");
            setUname(ChangeUser);
          }).catch((error) => {
            //When an error occurs, it usually due to a period of inactivity
            //Redirect user to login page to sign in again
            alert(error.message);
            LogOut();
          });
        }
    }

    //Function that updates the photoURL in firebase
    function UpdateImage(event: React.MouseEvent<HTMLButtonElement>){
        event?.preventDefault();

        //If no url has been inputted, return error
        if(!updatePhoto){
            return alert("Please Input Valid File");
        }
        const user = auth.currentUser;
        
        //If the user is not null to satisfy typescript checking
        if(user!== null){
            //Updates the user profile picture
        updateProfile(user, {
            photoURL: updatePhoto
          }).then(() => {
            //Set a temporary variable to the photourl, check if variable is not null
            //If variable is not null, update display on frontend
            alert("Update Successful!");
            var x = user.photoURL;
            if(x){
                setPhotoURL(updatePhoto);
            }
          }).catch((error) => {
            //When an error occurs, it usually due to a period of inactivity
            //Redirect user to login page to sign in again
            alert(error.message);
            LogOut();
          });
        }
    }

    //When a user clicks on their display icon, toggle a variable that determines whether
    //an input display for changing the image is visible.
    function ChooseImage(){
        event?.preventDefault();
        setChangeImage(prevCheck => !prevCheck);
    }

    //function for deleting the user
    function DeleteUser(event: React.MouseEvent<HTMLButtonElement>){
        event?.preventDefault();
        const user = auth.currentUser;
        if(user){
            deleteUser(user).then(() => {
                //If successful, redirect user to login page
                nav('/');
              }).catch((error) => {
                //If not successful, show user error and log them out to reauthenticate
                alert(error.message);
                LogOut();
              });
        }
    }

    //Function that updates password
    function UpdatePassword(e: React.MouseEvent<HTMLButtonElement>){
        event?.preventDefault();
        //If user has not inputted any password, return error.
        if(ChangePass === ''){
            return alert("Please Fill In Valid Value!");
        }
        const user = auth.currentUser;
        
        if(user!== null){
            updatePassword(user, ChangePass).then(() => {
                alert("Success");
              }).catch((error) => {
                //If not successful, show user error and log them out to reauthenticate
                alert(error.message)
                LogOut();
              });
            }
    }

    return(
        <div>
        <Navbar></Navbar>
        <div className = 'h-screen justify-center flex'>
            <img onClick={ChooseImage} id="Accountpfp" alt="User Profile Picture" src={photoURL || 'Assets/pfp.png'} className='h-48 mt-10 w-48 absolute rounded-full'/>
            {toggleChoose &&
            <div className=' mt-28 h-1/2 w-1/2 bg-slate-200 flex justify-center z-10 absolute'>
                <h1 id="ImageExit" onClick={ChooseImage} className="text-2xl font-bold text-black ml-auto mr-2 aboslute">X</h1>
                <input type="text" className='mt-48 ml-1 absolute w-1/2 h-10 bg-white rounded-lg text-center' placeholder="Input Image Link"
                onChange={(e) => setUpdatePhoto(e.target.value)}></input>
                <button id='PassChange' onClick={UpdateImage} className = "mt-72 mr-10 bg-white h-10 ml-10 w-2/12 absolute text-center rounded-lg border-solid border-blue-500 border text-black text-sm font-600" 
                >Update</button>
            </div>
            }
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
                onClick={DeleteUser}>Delete Account</button>
            </form>
        </div>
        </div>
    )
}