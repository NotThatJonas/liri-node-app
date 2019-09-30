# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. Use LIRI to get your latest tweets, find out about a song, or a movie, or just choose a random action from your own random file.

## Installs
The package.json lists dependent node packages, but for your convenvice, these are the ones to install.

## Spotify
npm install spotify

## FS
npm install fs

# Get Started
Here's a quick rundom of the commands you can use in LIRI.

## Get Song Info
Retrieves song information for a track:

node liri.js spotify-this-song "American Girl"

## Get Movie Info
Retrieves movie information for a movie:

node liri.js movie-this "Star Wars"

## Get Random Info
Gets random text inside a file and does what it says:

node liri.js do-what-it-says

# Expected Outcomes
The LIRI Bot was designed to produce search results based on the following commands:

node liri.js concert-this
node liri.js spotify-this-song
node liri.js movie-this
node liri.js do-what-it-says

Each command produced different search results as listed below:

## node liri.js concert-this “artist/band name”
Name of venue
Venue location
Date of the event in MM/DD/YYYY format

![concer-this](https://user-images.githubusercontent.com/51797891/65850243-f6b4e200-e302-11e9-8247-e49f16c31456.jpg)

## node liri.js spotify-this-song “song/track name”
Artist
Song
Spotify song preview url
Album

![spotify-this-song](https://user-images.githubusercontent.com/51797891/65850369-72af2a00-e303-11e9-889a-3d69a231a532.jpg)

## node liri.js movie-this “movie title”
Title of the movie
Year the movie came out
IMDB Rating of the movie
Country where the movie was produced
Language of the movie
Plot of the movie
Actors in the movie
Rotten Tomatoes Rating of the movie

![movie-this](https://user-images.githubusercontent.com/51797891/65850334-4dbab700-e303-11e9-813a-7726cfbd36e5.jpg)

## node liri.js do-what-it-says
Print the spotify results for “I want it that way” stored in the random.txt file

![do-what-it-says](https://user-images.githubusercontent.com/51797891/65850319-40053180-e303-11e9-8355-de30605f932b.jpg)


# Setup
1) Clone the repository

2) Run npm install, and the following packages should be installed:

-- Node-Spotify-API

-- Axios : This module will be used to get the IMDB and BandsInTown API data

-- Moment

DotEnv
1) Create a .env file in the same directory as the rest of the files. In the .env file should be:

   '# Spotify API keys'

   'SPOTIFY_ID=your-spotify-ID-here'

   'SPOTIFY_SECRET=your-spotify-secret-here'
