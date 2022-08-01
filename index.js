import express from 'express'
// const express = require('express');
import bodyParser from 'body-parser'
// This allows us to take in incomming post request bodies
import usersRoutes from './routes/users.js'

// install nodemon, no need to terminate server to get updates.
// dev dependency -- just for developer, no one use it.

const app = express()
// initialize express application, call express like a function
const PORT = 5000;
//asign a port, since front end usually use 3000, name a different one.

//initializ bodyParser middeware, decide what data to use in the application
//json like js object, while must use ""
app.use(bodyParser.json());

// specify the path, and use imported routes
app.use('/users', usersRoutes);
//create route, so we can visit or send request to browser
// each callback in express has two args, req and res; callback will run once we visited "/"
// visited means we make a get request--- browser can only make get request 
app.get('/', (req, res) => {
    res.send("Hello from Home")
})


// make app listen to incoming request
// port to listen, callback function to executed once we run the server
app.listen(PORT, ()=> console.log(`Server running on port : http://localhost:${PORT}`) )



//GET /users - finds all users
//POST /users - creates a user
//GET /users/:id - finds user details
//DELETE /users/:id deletes a user
//PATCH /users/:id updates a user -- partually modify something, update