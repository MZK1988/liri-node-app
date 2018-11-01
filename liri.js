require('dotenv').config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var bandsintown = require("bandsintown")("codingbootcamp");



var spotify = new Spotify(keys.spotify);
var spotifyId = keys.spotify.id;

var commandArgs = process.argv;
var command = process.argv[2];

var search = "";
var name = "";


for (var i = 3; i < commandArgs.length; i++) {
  if (i > 3 && i < commandArgs.length) {
    search = search + "+" + commandArgs[i];
    name = name + " " + commandArgs[i];
  }

  else {
    search += commandArgs[i];
    name += commandArgs[i];
  }
}


if (command === "movie-this" && search != "") {



  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";



  request(queryUrl, function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      // console.log(search + "'s rating is: " + JSON.parse(body));

      console.log("Title:");
      console.log(JSON.parse(body).Title);
      console.log("-------------------");
      console.log("Release Year:");
      console.log(JSON.parse(body).Year);
      console.log("-------------------");
      console.log("IMDB Rating:");
      console.log(JSON.parse(body).imdbRating);
      console.log("-------------------");
      console.log("Release Country:");
      // console.log(JSON.parse(body).ratings.source);
      console.log(JSON.parse(body).Country);
      console.log("-------------------");
      console.log("Release Language:");
      console.log(JSON.parse(body).Language);
      console.log("-------------------");
      console.log("Plot:");
      console.log(JSON.parse(body).Plot);
      console.log("-------------------");
      console.log("Actors:");
      console.log(JSON.parse(body).Actors);
      console.log("-------------------");
    }
  });

} else if (command === "concert-this" && search != "") {

  var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"



  request(queryUrl, function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      console.log("ARTIST:")
      console.log(name);
      console.log("-------------------");
      console.log("VENUE NAME:");
      console.log(JSON.parse(body)[0].venue.name);
      console.log("-------------------");
      console.log("VENUE CITY:");
      console.log(JSON.parse(body)[0].venue.city);
      console.log("-------------------");
      console.log("DATE/TIME OF PERFORMANCE:");
      console.log(JSON.parse(body)[0].datetime);
      console.log("-------------------");

    }
  }

  )
}

else if (command === "spotify-this-song" && search != "") {

  spotify.search({ type: 'track', query: search }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    } else {
      //console.log(data.tracks.items[0])
      for (let i = 0; i < data.tracks.items.length; i++) {



        console.log("ARTIST: ")
        console.log(data.tracks.items[i].artists[0].name);
        console.log("LINK: ")
        console.log(data.tracks.items[i].artists[0].external_urls.spotify);
        console.log("SONG NAME: ")
        console.log(name);
        console.log("ALBUM: ")
        console.log(data.tracks.items[i].album.name);
        console.log("______________________________________")
      }
    }

  });

} else if (command === "spotify-this-song" && search === "") {
  var song = "the+sign"
  var name = "The Sign"
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    } else {

      for (let i = 0; i < data.tracks.items.length; i++) {

        if (data.tracks.items[i].artists[0].name === "Ace of Base") {

          console.log("______________________________________")
          console.log("ARTIST: ")
          console.log(data.tracks.items[i].artists[0].name);
          console.log("LINK: ")
          console.log(data.tracks.items[i].artists[0].external_urls.spotify);
          console.log("SONG NAME: ")
          console.log(name);
          console.log("ALBUM: ")
          console.log(data.tracks.items[i].album.name);
          console.log("______________________________________")




        }
      }
    }

  });
} else if (command === "do-what-it-says") {
    
    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
        return console.log(error);
      }

      
      

      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");

      // We will then re-display the content as an array for later use.
      
      var execute = dataArr[1];
      var concatenate = execute.split(" ").join("+");
      console.log(concatenate);

      spotify.search({ type: 'track', query: concatenate }, function (err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        } else {
    
          for (let i = 0; i < data.tracks.items.length; i++) {
    
            
    
              console.log("______________________________________")
              console.log("ARTIST: ")
              console.log(data.tracks.items[i].artists[0].name);
              console.log("LINK: ")
              console.log(data.tracks.items[i].artists[0].external_urls.spotify);
              console.log("SONG NAME: ")
              console.log(execute);
              console.log("ALBUM: ")
              console.log(data.tracks.items[i].album.name);
              console.log("______________________________________")
    
    
    
    
            
          }
        }
    
      });









    });

  }
