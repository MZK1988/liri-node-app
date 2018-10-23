require('dotenv').config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");



var spotify  =  new Spotify(keys.spotify);

var movieName = process.argv[2];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log("This is the query url: " + queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    // console.log(movieName + "'s rating is: " + JSON.parse(body));
    
    console.log("JSON BODY:");
    console.log("-------------------");
    console.log(JSON.parse(body));
    console.log("-------------------");
    console.log("Release Year:");
    console.log("-------------------");
    console.log(JSON.parse(body).Year);
    console.log("-------------------");
    console.log("IMDB Rating:");
    console.log("-------------------");
    console.log(JSON.parse(body).imdbRating);
    console.log("-------------------");
    console.log("Release Country:");
    console.log("-------------------");
    // console.log(JSON.parse(body).ratings.source);
    console.log(JSON.parse(body).Country);
    console.log("-------------------");
    console.log("Release Language:");
    console.log("-------------------");
    console.log(JSON.parse(body).Language);
    console.log("-------------------");
    console.log("Plot:");
    console.log("-------------------");
    console.log(JSON.parse(body).Plot);
    console.log("-------------------");
    console.log("Actors:");
    console.log("-------------------");
    console.log(JSON.parse(body).Actors);
    console.log("-------------------");
  }
});

// var commandOne = process.argv[2];
// var commandCap = process.argv[]
// var title = null;

// if (commandOne = "movie-this") {
//   for(i = 3; i < commandCap.length; i++) {
//     if(commandCap != "") {
//         title = 
//     }
//   }

// } 

request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});


















