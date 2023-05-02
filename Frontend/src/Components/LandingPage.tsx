import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-400 min-h-screen flex flex-col justify-center items-center  bg-cover bg-fixed" style={{ backgroundImage: "url('Assets/login-bg.jpg')" }}>
      <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Bungee+Shade&display=swap" rel="stylesheet" />

      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-600 font-bungee-shade">Welcome to our movie searching site</h1>
    </div>
      <p className="text-white text-lg md:text-2xl mb-12 text-center max-w-screen-lg">
        Easily find the newest and most popular movies, save your favorites, and search for specific movies based on their name or tags. Our user-friendly interface makes it easy for you to explore and discover new movies, while also keeping track of your favorites for future viewing. With our advanced search feature, you can quickly find information about any movie you want, including its cast, synopsis, ratings, and more. Start your movie journey with us today and never miss out on your favorite flicks again!
      </p>

      <Link to="/login" className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full">
        Login
      </Link>
    </div>
  );
};

export default LandingPage;
