import React, { Component } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

class Login extends Component {
  state = {
    data: {
      username: null,
      password: null
    }
  }

  handleChange = (e) => {
    let newData = this.state.data;
    newData[e.target.name] = e.target.value;

    this.setState({ data: newData });
  }
  
  attemptLogin = (e) => {
    e.preventDefault();

    // Fetch user data
    axios.get(`https://james.guide/api/user/${this.state.data.username}`)
    .then(res => {
      if (res.length > 0) {
        // Verify user password
        if (bcrypt.compareSync(data.password, res[i].password)) {
          res.send(`Welcome, ${res[i].username}!`);
        }
        else {
          res.send('Wrong password. Please try again.');
        }
      }
      else {
        res.send(`Cannot find username ${this.state.data.username}`);
      }
      
    });

    axios.post('https://james.guide/api/login', this.state.data)
    .then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <form onSubmit={this.attemptLogin} className="login" method="post">
        <h3>You aren't logged in.</h3>
        <input name="username" type="text" placeholder="Username" onChange={this.handleChange} />
        <br />
        <input name="password" type="password" placeholder="Password" onChange={this.handleChange} />
        <br />
        <button type="submit">Log in</button>
        <br /><br />
        <span>Not a member yet? </span>
        <button type="button" onClick={this.props.switch}>Register</button>
      </form>
    )
  }
}

export default Login;