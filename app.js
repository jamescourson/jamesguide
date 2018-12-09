// Import dependencies
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var connection = require('./config/db.js');
var bcrypt = require('bcryptjs');

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
app.use(cookieParser());

// Locate static resources
app.use(express.static(path.join(__dirname, 'static')));

// API routes
app.get('/api/user/:id', (req, res) => {
  connection.query(`SELECT * FROM users WHERE username='${req.params.id}'`, (err, rows, fields) => {
    res.json(rows);
  });
});

app.get('/api/users', (req, res) => {
  connection.query('SELECT username FROM users', (err, result) => {
    res.json(result);
  });
});

app.get('/api/forums', (req, res) => {
  connection.query('SELECT * FROM forums', (err, result) => {
    res.json(result);
  });
});

// Auth routes
app.post('/api/login', (req, res) => {
  let data = req.body;
  let query = `SELECT * FROM users WHERE username='${data.username}'`

  connection.query(query, (err, rows, fields) => {
    for (let i = 0; i < rows.length; i++) {
      // Verify user password
      if (bcrypt.compareSync(data.password, rows[i].password)) {
        res.cookie('user', rows[i], { maxAge: 90000, secure: true });
        res.send(`Welcome, ${rows[i].username}!`);
      }
    }
  });
});

app.post('/api/register', (req, res) => {
  let data = req.body;

  connection.query(`SELECT * FROM users WHERE username='${data.username}'`, (err, rows, fields) => {
    if (!rows) {
      let query = `INSERT INTO users (username, email, password) VALUES ('${data.username}', '${data.email}', '${data.password}')`;
    
      // Check for duplicate username
      connection.query(query, (err, result) => {
        res.send('Registration successful!');
      });
    }
    else {
      res.send('That username is already taken.');
    }
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the James\' Guide API!');
})

// Start server
app.listen(port, () => {
  console.log('Listening on port %s', port);
});