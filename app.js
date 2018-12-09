// Import dependencies
const express = require('express');
var connection = require('./config/db.js');

// Initialize express
var app = express();

// Define port
const port = 3000;

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Enable body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.get('/api/:id', (req, res) => {
  connection.query(`SELECT username FROM ${req.params.id}`, (err, result) => {
    res.json(result);
  });
});

// Auth routes
app.post('/api/login', (req, res) => {
  let data = req.body;

  // parse data

  connection.query(`SELECT * FROM users WHERE username=${data.username}`, (err, rows, fields) => {
     res.json(rows);
  });
});

app.post('/api/register', (req, res) => {
  let data = req.body;

  // Check for duplicate username
  connection.query(`INSERT INTO users (username, email, password) VALUES (${data.username}, ${data.email}, ${data.password})`, (err, result) => {
    res.send('Successfully registered!');
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the James\' Guide API!');
})

// Start server
app.listen(port, () => {
  console.log('Listening on port %s', port);
});