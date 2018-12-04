// Import dependencies
const express = require('express');
var connection = require('./config/db.js');

// Initialize express
var app = express();

// Enable body parsing
app.use(express.json());
app.use(express.urlencoded());

// Define api route
app.get('/api/:id', (req, res) => {
  connection.connect();

  connection.query(`SELECT * FROM ${req.query.id}`, (err, result) => {
    res.json(result);
  });

  connection.end();
});

// Start server
app.listen(80, () => {
  console.log('Listening on port 80');
});