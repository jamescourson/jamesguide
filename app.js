// Import dependencies
const express = require('express');
const path = require('path');
var bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Import sensitive information
var connection = require('./config/db.js');
const cookieInfo = require('./config/cookie.js');

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

// Initialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure session
app.set('trust proxy', 1);

app.use(session({
  secret: cookieInfo.secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 86400000,
    domain: 'james.guide',
    secure: true
  }
}));

// Locate static resources
app.use(express.static(path.join(__dirname, 'build')));

// Routes

// Find user - returns user data based on parameters
app.get('/api/user/:id', (req, res) => {
  connection.query(`SELECT * FROM users WHERE username='${req.params.id}'`, (err, rows, fields) => {
    if (rows.length > 0) {
      res.json(rows[0]);
    }
  });
});

// List users - returns a list of all registered usernames
app.get('/api/users', (req, res) => {
  connection.query('SELECT username FROM users', (err, result) => {
    res.json(result);
  });
});

// List forums - returns a list of all forums
app.get('/api/forums', (req, res) => {
  connection.query('SELECT * FROM forums', (err, result) => {
    res.json(result);
  });
});

// Login - verifies user credentials and creates a session variable
app.post('/api/login', (req, res) => {
  // User input
  let data = req.body;

  // Retrieve user password
  let query = `SELECT * FROM users WHERE username='${data.username}'`;

  connection.query(query, (err, rows, fields) => {
    if (rows.length > 0) {
      let user = rows[0];

      if (bcrypt.compareSync(data.password, user.password)) {
        // Assign session variable
        req.session.user = {
          username: user.username,
          email: user.email
        };

        // Return login confirmation
        res.json({
          success: true,
          message: `Welcome, ${data.username}!`,
          user: req.session.user
        });
      }
      else {
        res.json({
          success: false,
          message: 'Wrong password. Please try again.'
        });
      }
    }
    else {
      res.json({
        success: false,
        message: 'Username not found. Please try again.'
      });
    }
  });
});

// Register - creates a new user profile
app.post('/api/register', (req, res) => {
  // User input
  let data = req.body;

  // Check for existing users
  let query = `SELECT COUNT(*) AS userCount FROM users WHERE username='${data.username}'`;
  
  connection.query(query, (err, rows, fields) => {
    if (rows[0].userCount === 0) {
      // Create new user
      query = `INSERT INTO users (username, email, password) VALUES ('${data.username}', '${data.email}', '${data.password}')`;

      connection.query(query, (err, result) => {
        // Return registration info
        res.json({
          success: true,
          message: 'Registration successful!'
        });
      });
    }
    else {
      res.json({
        success: false,
        message: 'That username is already taken. Please try again.'
      })
    }
  });
});

// Logout - removes user session variable
app.get('/logout', (req, res) => {
  // Remove user session
  req.session.destroy();

  // Redirect to index
  res.redirect('/');
});

// Auth - returns user data (if exists)
app.get('/auth', (req, res) => { req.session.user ? res.send(req.session.user) : res.send(false) });

// Index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.get('/f/:id', (req, res) => {
  // Find requested forum
  let query = `SELECT * FROM forums WHERE id='${req.params.id}'`;

  connection.query(query, (err, rows, fields) => {
    if (rows.length > 0) {
      // Find topics within forum
      let query = `SELECT * FROM topics WHERE forum='${req.params.id}'`;

      connection.query(query, (t_err, t_rows, t_fields) => {
        res.json({
          success: true,
          content: {
            forum: rows[0],
            topics: t_rows
          }
        });
      });
    }
    else {
      res.json({
        success: false,
        content: null
      });
    }
  });
});

app.get('/t/:id', (req, res) => {
  // Find requested topic
  let query = `SELECT * FROM topics WHERE id=${req.params.id}`;

  connection.query(query, (err, rows, fields) => {
    if (rows.length > 0) {
      res.json({
        success: true,
        content: {
          topic: rows[0],
          replies: null
        }
      })
    }
    else {
      res.json({
        success: false,
        content: null
      });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});