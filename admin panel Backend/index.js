require('dotenv').config()
const express=require('express');
const app=express()

const port=process.env.port||5500

require('./dbConnection/dbConnection.js').ConnectDB()
const Router = require('./router/router.js'); // Adjust the path if necessary
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Middleware to use the router
app.use('/api', Router);


app.listen(port,()=>{
    console.log(`app stated on port ${port}`)
})