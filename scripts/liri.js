
// Read and set environment variables
require("dotenv").config();

//VARS
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//vars to capture user inputs.
var userOption = process.argv[2]; 
var inputParameter = process.argv[3];

//Execute function
UserInputs(userOption, inputParameter);

//FUNCTIONS
function UserInputs (userOption, inputParameter){
    switch (userOption) {
    case 'concert-this':
        showConcertInfo(inputParameter);
        break;
    case 'spotify-this-song':
        showSongInfo(inputParameter);
        break;
    case 'movie-this':
        showMovieInfo(inputParameter);
        break;
    case 'do-what-it-says':
        showSomeInfo();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

//Funtion for Concert Info: Bands in Town
function showConcertInfo(inputParameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var concerts = JSON.parse(body);
        for (var i = 0; i < concerts.length; i++) {  
            console.log("**********EVENT INFO*********");  
            fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
            console.log(i);
            fs.appendFileSync("log.txt", i+"\n");
            console.log("Name of the Venue: " + concerts[i].venue.name);
            fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name+"\n");
            console.log("Venue Location: " +  concerts[i].venue.city);
            fs.appendFileSync("log.txt", "Venue Location: " +  concerts[i].venue.city+"\n");
            console.log("Date of the Event: " +  concerts[i].datetime);
            fs.appendFileSync("log.txt", "Date of the Event: " +  concerts[i].datetime+"\n");
            console.log("*****************************");
            fs.appendFileSync("log.txt", "*****************************"+"\n");
        }
    } else{
      console.log('Error occurred.');
    }
});}

//Funtion for Music Info: Spotify
function showSongInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "The Sign"; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: inputParameter
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("**********SONG INFO*********");
                fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log(i);
                fs.appendFileSync("log.txt", i +"\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");  
                fs.appendFileSync("log.txt", "*****************************\n");
             }
        }
    );
};

//Funtion for Movie Info: OMDB
function showMovieInfo(inputParameter){
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
        console.log("-----------------------");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=b3c0b435";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var movies = JSON.parse(body);
        console.log("**********MOVIE INFO*********");  
        fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
        console.log("Title: " + movies.Title);
        fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
        console.log("Release Year: " + movies.Year);
        fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
        console.log("IMDB Rating: " + movies.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
        console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
        fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
        console.log("Country of Production: " + movies.Country);
        fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
        console.log("Language: " + movies.Language);
        fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
        console.log("Plot: " + movies.Plot);
        fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
        console.log("Actors: " + movies.Actors);
        fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
        console.log("*****************************");  
        fs.appendFileSync("log.txt", "*****************************\n");
    } else{
      console.log('Error occurred.');
    }

});}

//function to get proper Rotten Tomatoes Rating
function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }

//function for reading out of random.txt file  
function showSomeInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
	});
}

///
//Set up and attaching files to liri.js
// require("dotenv").config();
// var keys = require("./keys.js");
// var fs = require("fs");
// var SpotifyAPI = require("node-spotify-api");
// var spotify = new SpotifyAPI (keys.spotify);
// // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)

// var axios = require("axios");

// // var liri = 
// // Store all of the arguments in an array
// var command = process.argv[2];

// var input = process.argv.slice(3).join(" ");

// //Got a wierd error and had to throw the commands into a function and call the function at teh end to get it to work properly
// function runLiri() {
// if (command === "watch-this") {
//     findMovie(input);   
// }
// if (command === "concert-this") {
//     findArtist(input);
// }
// if (command === "spotify-this-song") {
//     songInfo(input);
// }
// if (command === "do-what-it-says"){
//     doWhatInfo();
// }
// }

// // first var to grab movie info
//   var findMovie = function (movie) {
//     var URL = "http://www.omdbapi.com/?t=" +  movie  + "&y=&plot=short&apikey=trilogy";
//     axios.get(URL).then(
//         function(response) {

//         var movieData = [

//             "Movie Title: " + response.data.Title,
//             "Release Year: " + response.data.Year,
//             "IMBD Rating: " + response.data.Ratings[0].Value,
//             "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
//             "Country: " + response.data.Country,
//             "Language: " + response.data.Language,
//             "Plot: " + response.data.Plot,
//             "Actors: " + response.data.Actors,

//         ].join("\n\n")
    
//         console.log(movieData)

//         });          
//     };

//     // second var to grab artist/band info
//   var  findArtist = function (artist) {
//         var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//         axios.get(URL).then(
//             function(response) {
//                 var artistData = [
//                     "Venue Name: " + response.data[0].venue.name,
//                     "Venue Location: " + response.data[0].venue.city,
//                     "Date of Event: " + response.data[0].datetime //add moment
//                 ].join("\n\n")
//         console.log(artistData)
//         });


//     };

//     // song info 
//     function songInfo(){
//         var songName = "";
//         for (var i = 3; i < input.length; i++){
//             if (i > 3 && i < input.length){
//                 songName = songName + "+" + input[i];
//             }
//             else{
//                 songName += input[i];
//             }
//         }

//             spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function(error, songResponse) {
//                 if (error){
//                     return console.log(error);
//                 }
//                 console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
//                 console.log("Song: " + songResponse.tracks.items[0].name);
//                 console.log("URL: " + songResponse.tracks.items[0].preview_url);
//                 console.log("Album: " + songResponse.tracks.items[0].album.name);
//             });
//         };

//         // grab text from random text file and split the text to run the spotify function
//         function doWhatInfo() {

//             fs.readFile("./random.txt", "utf8", function(error, data) {
//               if (error) {
//                 return console.log(error);
//               }
//                 var output = data.split(",");
//                 for (var i = 0; i < output.length; i++) {
//                     console.log(output[i]);
//                 }
//               });
//         };
    
// runLiri();

