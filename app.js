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

// Define api route
app.get('/api/:id', (req, res) => {
  connection.query(`SELECT * FROM ${req.params.id}`, (err, result) => {
    res.json(result);
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the James\' Guide API!');
})

// Start server
app.listen(port, () => {
  console.log('Listening on port %s', port);
});