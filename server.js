/*

created by: Najla Albaz

*/
// Express to run server and routes
const express = require('express');
const port = 3000;
const projectData = [];

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
// Callback to debug
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// Callback function to complete GET '/all'
const getDataInServer = (req, res) => {
    console.log('Getting data from server:');
    console.log(projectData);
    res.send(projectData);
}

// Initialize all route with a callback function
app.get('/all', getDataInServer);


// Post Route
const postDataFromClient = (req, res) => {
    console.log('Adding data to server.');
    console.log(req.body);
    projectData.push(req.body);
    console.log(projectData);
}

app.post('/addData', postDataFromClient);