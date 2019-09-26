//Set up and attaching files to liri.js
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var SpotifyAPI = require("node-spotify-api");
var spotify = new SpotifyAPI (keys.spotify);
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)

var axios = require("axios");

// var liri = 
// Store all of the arguments in an array
var command = process.argv[2];

var input = process.argv.slice(3).join(" ");

//Got a wierd error and had to throw the commands into a function and call the function at teh end to get it to work properly
function runLiri() {
if (command === "watch-this") {
    findMovie(input);   
}
if (command === "concert-this") {
    findArtist(input);
}
if (command === "spotify-this-song") {
    songInfo(input);
}
if (command === "do-what-it-says"){
    doWhatInfo();
}
}

// first var to grab movie info
  var findMovie = function (movie) {
    var URL = "http://www.omdbapi.com/?t=" +  movie  + "&y=&plot=short&apikey=trilogy";
    axios.get(URL).then(
        function(response) {

        var movieData = [

            "Movie Title: " + response.data.Title,
            "Release Year: " + response.data.Year,
            "IMBD Rating: " + response.data.Ratings[0].Value,
            "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
            "Country: " + response.data.Country,
            "Language: " + response.data.Language,
            "Plot: " + response.data.Plot,
            "Actors: " + response.data.Actors,

        ].join("\n\n")
    
        console.log(movieData)

        });          
    };

    // second var to grab artist/band info
  var  findArtist = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(URL).then(
            function(response) {
                var artistData = [
                    "Venue Name: " + response.data[0].venue.name,
                    "Venue Location: " + response.data[0].venue.city,
                    "Date of Event: " + response.data[0].datetime //add moment
                ].join("\n\n")
        console.log(artistData)
        });


    };

    // song info 
    function songInfo(){
        var songName = "";
        for (var i = 3; i < input.length; i++){
            if (i > 3 && i < input.length){
                songName = songName + "+" + input[i];
            }
            else{
                songName += input[i];
            }
        }

            spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function(error, songResponse) {
                if (error){
                    return console.log(error);
                }
                console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
                console.log("Song: " + songResponse.tracks.items[0].name);
                console.log("URL: " + songResponse.tracks.items[0].preview_url);
                console.log("Album: " + songResponse.tracks.items[0].album.name);
            });
        };

        // grab text from random text file and split the text to run the spotify function
        function doWhatInfo() {

            fs.readFile("./random.txt", "utf8", function(error, data) {
              if (error) {
                return console.log(error);
              }
                var output = data.split(",");
                for (var i = 0; i < output.length; i++) {
                    console.log(output[i]);
                }
              });
        };
    
runLiri();

