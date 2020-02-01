var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("importing movies from file");

var allMovies = JSON.parse(fs.readFileSync("./moviedata/moviedata.json", "utf-8"));

allMovies.forEach(movie => {
    var params = {
        TableName: "Movies",
        Item: {
            "year": movie.year,
            "title": movie.title,
            "info": movie.info
        }
    }
    docClient.put(params, (err, data) => {
        if (err) {
            console.log("Unable to add movie", movie.title, ". Eroor JSON: ", JSON.stringify(err, null, 2));
        } else {
            console.log("Uploaded movie", movie.title);
        }
    });
});