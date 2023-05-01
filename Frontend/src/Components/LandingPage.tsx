import React from "react";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="w-1/2 text-2xl font-bold mb-8 font-serif text-purple-800">Welcome to our movie searching site, where you can easily find the newest and most popular movies, save your favorites, and search for specific movies based on their name or tags. Our user-friendly interface makes it easy for you to explore and discover new movies, while also keeping track of your favorites for future viewing. With our advanced search feature, you can quickly find information about any movie you want, including its cast, synopsis, ratings, and more. Start your movie journey with us today and never miss out on your favorite flicks again!
      </h1>

      <Link to="/login" className="mt-8 text-pink-400 underline">
        Login
      </Link>
    </div>
  );
};

export default LandingPage;