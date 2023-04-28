## How To Run
Firstly, clone the file from github and open it in VScode, then open up two terminal instances. In the first terminal instance, cd into the directoy 'Backend', and the second instance cd into 'Frontend'. Run these commands in each of the respective terminals.

Frontend - npm run dev
Backend - node server.js

Now the app should be fully running, and you can visit localhost:3000 to see it in action

## Technologies Used

The tech stack we used for this project is as follows, Reactjs for the frontend user interface that formats all the movie details into a user friendly format. Expressjs for the backend that handles all requests from the frontend, and queries the APIs we use to receive such data, and also interacts with a Mongodb server using Mongoose to save information such as comments and a user's favorites. Nodejs is the runtime environment that this project operates in, and vite is the frontend compiler that is used to launch the frontend of the site. Tailwindcss is our styling framework for most of the project, which we chose because tailwindcss offers convenient class based styling that saved us time and energy from writing hundreds of lines of vanilla css. Finally, we used Firebase as the user database, holding information about the user such as their profile picture and display name, and also as a means of protection against unauthorized users.

## Goal Of The Project
The goal of the project was extremely simple, create a movie database that the developers of the site could actually see themselves using at some point. We had some basic goals in mind while crafting this project, such as implementing multiple searching features that allowed users to filter movies by their name or genre type, allowing users to have a custom watchlist of movies, and finally allowing users to customize their accounts. This site needed to not only be a place where users can see information about movies, but also a place where they could leave their opinions and interact with other users through discussion sections. The final goal of this project was to test and advance our skills as web developers, learning new and useful technologies and techniques that will most certainly be of upmost value in our future careers.