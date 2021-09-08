// import the express module
const express = require('express');

// instantiate an application server
const app  = express();

// add support to parsing json in the body
app.use(express.json());

app.use(express.static("./public"));

// add item routes
const items = require("./items/routes");
app.use(items);

// const users = require("./users/routes");
// app.use(users);

// define the port that this app location is listening on
const PORT = 4000;

// start the application server
app.listen(PORT, function(){
    console.log("App started, listening on port: ",  PORT);
});