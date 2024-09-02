require('dotenv').config()
const express=require('express');
const app=express()
const https = require("https");
const port=process.env.port||5500
const cors=require('cors')

require('./dbConnection/dbConnection.js').ConnectDB()
const Router = require('./router/router.js'); // Adjust the path if necessary
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Middleware to use the router
app.use(cors())
app.use('/api', Router);


 
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

// Creating https server by passing
// options and app object
https.createServer(options, app)
    .listen(port, function (req, res) {
        console.log(`Server started at port ${port}`);
    });