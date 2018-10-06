require("dotenv").config();
const moment = require("moment")
const keys = require("./keys")
const request = require("request");
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keys.spotify);
const fs = require("fs")

let input = process.argv[2]

if (input === "concert-this") {
  let artist = process.argv.slice(3).join("+");
  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  request(queryURL, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    if (!error && response.statusCode === 200) {
      console.log("Keys Loaded")
      console.log("Upcoming concerts for " + process.argv[3] + ":")

      for (let i = 0; i < 6; i++) {

        let unformattedDate = JSON.parse(body)[i].datetime;
        let date = moment(unformattedDate).format("MM/DD/YYYY")

        console.log(JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region + " at " + JSON.parse(body)[i].venue.name + " on " + date);

      }
    }
  });
} else if (input === "spotify-this-song") {
  let song = process.argv.slice(3).join("+");
  spotify
      .request('https://api.spotify.com/v1/search?q=' + song + "&type=track&limit=5")
      .then(function(data) {
        console.log("Keys loaded")
        for (let i = 0; i < data.tracks.items.length; i++) {
          console.log(i + 1)
          console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
          console.log("Song name: " + data.tracks.items[i].name);
          console.log("Preview: " + data.tracks.items[i].preview_url);
          console.log("Album: " + data.tracks.items[i].album.name);
          console.log("-----------------------------------")
        }
      })
      .catch(function(err) {
        console.error('Error occurred: ' + err);
      });


} else if (input === "movie-this") {

  let movieName = process.argv.slice(3).join("+")
  let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&apikey=trilogy"

  request(queryURL, function(error, response, body) {
    if (error) {
      console.log(error)
    }
    if (!error && response.statusCode === 200) {

      console.log("Keys loaded")
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("Rated: " + JSON.parse(body).Rated)
      console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot Summary: " + JSON.parse(body).Plot);
      console.log("Significant Actors: " + JSON.parse(body).Actors);
      console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
    }
  });
} else if (input === "do-what-it-says") {
  fs.readFile("./random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    let dataArr = data.split(",");

    if (dataArr[0] === "concert-this") {
      let artist = dataArr[1].split(" ").join("+");
      let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

      request(queryURL, function(error, response, body) {
        if (error) {
          console.log(error)
        }
        if (!error && response.statusCode === 200) {
          console.log("Keys Loaded")
          console.log("Upcoming concerts for " + dataArr[1] + ":")

          for (let i = 0; i < 6; i++) {

          let unformattedDate = JSON.parse(body)[i].datetime;
          let date = moment(unformattedDate).format("MM/DD/YYYY")

          console.log(JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region + " at " + JSON.parse(body)[i].venue.name + " on " + date);

          }
        }
      });
    } else if (dataArr[0] === "movie-this") {
        let movieName = dataArr[1].split(" ").join("+");
        let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&apikey=trilogy"

        request(queryURL, function(error, response, body) {
          if (error) {
            console.log(error)
          }
          if (!error && response.statusCode === 200) {
            console.log("Keys loaded")
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rated: " + JSON.parse(body).Rated)
            console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot Summary: " + JSON.parse(body).Plot);
            console.log("Significant Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
          }
        });
    } else if (dataArr[0] === "spotify-this-song") {
        let song = dataArr[1].split(" ").join("+");
        spotify
            .request('https://api.spotify.com/v1/search?q=' + song + "&type=track&limit=5")
            .then(function(data) {
              console.log("Keys loaded")
              for (let i = 0; i < data.tracks.items.length; i++) {
                console.log(i + 1)
                console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
                console.log("Song name: " + data.tracks.items[i].name);
                console.log("Preview: " + data.tracks.items[i].preview_url);
                console.log("Album: " + data.tracks.items[i].album.name);
                console.log("-----------------------------------")
              }
            })
            .catch(function(err) {
              console.error('Error occurred: ' + err);
            });
    }

  });
} else {
  console.log("Please enter valid command.")
}