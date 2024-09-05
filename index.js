// SERVER-SIDE 

const axios = require('axios'); // Library required for LTA API documentation 
const ejs = require('ejs');
const express = require('express');
//const serverless = require('serverless-http');
// const mainRoutes = require('./routes/main');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // Import the 'path' module
const cron = require('node-cron');
const fs = require('fs');
const csvParser = require('csv-parser');
const { rejects } = require('assert');
const app = express();
const router = express.Router();
const port = 3000;

const db = new sqlite3.Database('database.db');


app.set("views", path.join(__dirname, "views")); // Use 'path.join' for cross-platform compatibility
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + 'css'));
app.use(express.static(__dirname + 'script'));


app.get('/', (req,res)=>{
  res.render('newindex.ejs');  // change this once home page changed
}) 

// Define a route to render the loggedin.ejs page
app.get('/loggedinhome', (req, res) => {
  res.render('loggedinhome.ejs'); // Replace 'loggedin' with your actual template name
});

app.get('/home', (req, res) => {
  res.render('index1.ejs');  // change this once the home page has changed 
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Handle POST request for signup form
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Validate and sanitize user input here if needed
  if (password !== confirmPassword){
    // Passwords do not match, handle this case
    return res.render('signup', {error: 'Passwords do not match'});
  }

  // Insert user data into the 'userCredentials' table
  const query = 'INSERT INTO userCredentials (name, email, password) VALUES (?, ?, ?)';
  db.run(query, [name, email, password], (err) => {
    if (err) {
      console.error(err);
      // Handle the error, such as displaying an error message on the page
      res.render('signup', { error: 'Error creating an account.' });
    } else {
      // User account created successfully
      // Redirect to a success page or show a success message
      return res.render('/signup');  // You need to define this route and corresponding success page 
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

