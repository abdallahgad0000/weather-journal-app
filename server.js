// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port , listening);
function listening(){

    console.log("server running");
    console.log(`running on localHost:${port}`)
}

// the get route 
app.get('/getDate',function(req,res){
    res.send(JSON.stringify(projectData));
});

// the post route
app.post('/addData',function(req,res){
    let data = {
        temperature : req.body.temperature,
        date: req.body.date,
        userResponse : req.body.userResponse,
    };

    projectData.push(data);
    console.log(projectData);
    res.send("post received");
});