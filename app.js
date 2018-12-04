const express = require('express');
var connection = require('./config/db.js');
var app = express();

// enable body parsing
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, result, fields) => {
    res.json(result);
  });
});

app.listen(80, (err, res) => {
  if (err) throw err;

  console.log('Listening on port 80');
});