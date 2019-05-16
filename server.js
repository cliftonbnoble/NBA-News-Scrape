//require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Set up our port to be either the host's port or 3000
var PORT = process.env.PORT || 3000;

//Our Express server
var app = express();

//Express Router
var router = express.Router();

require("./config/routes")(router);

//Our public folder as a static directory
app.use(express.static(__dirname + "/public"));

//connect handlebars to express
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Use bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));

//Have every request go through our rotuer middleware
app.use(router);

//if deployed use the deployed database.  Otherwise use local
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect mongoose to our database
mongoose.connect(db, function(error){
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful")
    }
});

//Listen on the port
app.listen(PORT, function() {
    console.log("Listening on: " + "http://localhost:" + PORT)
})