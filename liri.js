require("dotenv").config();

//vars
var keys = require("./keys");
var fs = require("fs");
var request = require("request");

//var Spotify = require('spotify-web-api-node');
var Spotify = require('node-spotify-api');
//creates log.txt file
var filename = 'log.txt';
//NPM module used to write output to console and log.txt simulatneously
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

//argv[2] chooses users actions; argv[3] is input parameter, ie; movie title
var userCommand = process.argv[2];
var secondCommand = process.argv[3];

//concatenate multiple words in 2nd user argument
for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}

// Fetch Spotify Keys
var spotify = new Spotify(keys.spotify);

// Writes to the log.txt file
var getArtistNames = function (artist) {
    return artist.name;
};
//Done
// Function for running a Spotify search - Command is spotify-this-song
var getSpotify = function (secondCommand) {

    if (secondCommand === undefined) {
        secondCommand = "lights down low";
    }
  
    spotify.search(
        {
            type: "track",
            query: secondCommand
        },
        
        function (err, data) {

            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                log.info('================ Song Info ================');
                log.info("artist(s): " + songs[i].artists.map(getArtistNames));
                log.info("song name: " + songs[i].name);
                log.info("preview song: " + songs[i].preview_url);
                log.info("album: " + songs[i].album.name);
                log.info('==================THE END=================');
            }
            
            console.log("See log.txt file for results");
        }
    );
};
//Done
var getConcert = function (secondCommand){
    if (secondCommand === undefined) {
        secondCommand = "Iron Maiden";
    }
  
     // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
    //var movieName = secondCommand;
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + secondCommand + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, body) {

        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
            var data;
 
            for (var i = 0; i < body.length; i++) {
                data = body[i];
                //Simultaneously output to console and log.txt via NPM simple-node-logger
                log.info('================ Band Info ================');
                log.info("Name: " + data.venue.name);
                log.info("Location: " + data.venue.city);
                log.info("Date of event: " + data.datetime);
                log.info('==================THE END=================');
               
             }
                console.log("See log.txt file for results");
        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in a movie title
        if (secondCommand === "Undefined") {
            console.log("-----------------------");
            console.log("Please type a band name");
           
        }
    });
}
//Done
//OMDB Movie - command: movie-this
function getMovie(secondCommand) {
    if (secondCommand === undefined) {
        secondCommand = "Mr. Nobody";
    }
    // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
    //var movieName = secondCommand;
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + secondCommand + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            //Simultaneously output to console and log.txt via NPM simple-node-logger
            log.info('================ Movie Info ================');
            log.info("Title: " + body.Title);
            log.info("Release Year: " + body.Year);
            log.info("IMdB Rating: " + body.imdbRating);
            log.info("Country: " + body.Country);
            log.info("Language: " + body.Language);
            log.info("Plot: " + body.Plot);
            log.info("Actors: " + body.Actors);
            log.info("Rotten Tomatoes Rating: " + body.Ratings[0].Value);
            log.info("Rotten Tomatoes URL: " + body.tomatoURL);
            log.info('==================THE END=================');
            console.log("See log.txt file for results");


        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in a movie title
        if (secondCommand === "Undefined") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        }
    });
}

//Function for command do-what-it-says; reads and splits random.txt file
//command: do-what-it-says
function doWhat() {
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        //split text with comma delimiter
        var cmds = data.toString().split(',');
        
        secondCommand = cmds[1];
        mySwitch(cmds[0].toString());
        console.log("See log.txt file for results");


    });
}

//Switch command
function mySwitch(userCommand) {

    //choose which statement (userCommand) to switch to and execute
    switch (userCommand) {

        case "concert-this":
            getConcert(secondCommand);
            break;

        case "spotify-this-song":
            getSpotify(secondCommand);
            break;

        case "movie-this":
            getMovie(secondCommand);
            break;

        case "do-what-it-says":
            doWhat();
            break;
    }

}   //Closes mySwitch func - Everything except the call must be within this scope

//Call mySwitch function
mySwitch(userCommand);
