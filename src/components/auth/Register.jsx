import React, { Component } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

class Register extends Component {
  state = {
    data: {
      username: null,
      email: null,
      password: null,
      password_repeat: null
    }
  }

  handleChange = (e) => {
    let newData = this.state.data;
    newData[e.target.name] = e.target.value;

    this.setState({ data: newData });
  }

  attemptRegister = (e) => {
    e.preventDefault();

    // hash user password
    let registerData = this.state.data;
    
    bcrypt.hash(registerData.password, 10, (err, hash) => {
      registerData.password = hash;
    });

    axios.get('https://james.guide/api/users')
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].username === registerData.username) {
          return 'That username is taken.';
        }
      }
    });

    axios.post('https://james.guide/api/register', registerData)
    .then(res => {
    });
  }

  render() {
    return (
      <form onSubmit={this.attemptRegister} className="register" method="post">
        <h3>Register for James' Guide.</h3>
        <input name="username" placeholder="Username" onChange={this.handleChange} />
        <br />
        <input name="email" placeholder="Email" onChange={this.handleChange} />
        <br />
        <input name="password" placeholder="Password" onChange={this.handleChange} />
        <br />
        <input name="password_repeat" placeholder="Repeat" onChange={this.handleChange} />
        <br />
        <button>Register</button>
        <br /><br />
        <span>Already a member? </span>
        <button>Login</button>
      </form>
    )
  }
}

export default Register;