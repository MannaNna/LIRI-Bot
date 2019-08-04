# LIRI-Bot
LIRI is a command line node app that takes in parameters and gives you back data using Nodejs, npm packages - request, spotify and tmdb.
LIRI-Bot
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI uses the following commands:

spotify-this-song

movie-this

concert-this

do-what-it-says

Technologies used:

Node.js
Javascript
npm packages: require, spotify, axios, simple log

How to Run LIRI-Bot

1: node liri.js spotify-this-song <song name here>
This will output the following information to log.txt:
 * Artist(s) * The song's name 
 * A preview link of the song from Spotify 
 * The album that the song is from

if no song is provided then the program will default to
"Lights down low" by Max

2: node liri.js movie-this <movie name here>

This will output the following information to log.txt:

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.
Rotten Tomatoes URL.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

3: node liri.js do-what-it-says

This will output the command placed in random.txt file

4: node liri.js concert-this <artist/band name here>

This will search the Bands in Town Artist 
This will output the following information to log.txt:
Name of the venue
Venue location
Date of the Event