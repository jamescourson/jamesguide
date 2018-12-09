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

    let registerData = this.state.data;

    let allFieldsFilled = Object.values(registerData).includes(null);
    let passwordsMatch = registerData.password === this.state.data.password_repeat;

    // Check if all fields are filled in
    if (allFieldsFilled) {
      return 'Please fill in every field.';
    }

    // Check to see if passwords match
    if (!passwordsMatch) {
      return 'Your passwords do not match.';
    }

    // Hash password
    registerData.password = bcrypt.hashSync(registerData.password, 10);

    // Check for duplicate usernames
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
      return res;
    });
  }

  registerHandler = (e) => {
    console.log(this.attemptRegister(e));
  }

  render() {
    return (
      <form onSubmit={this.registerHandler} className="register" method="post">
        <h3>Register for James' Guide.</h3>
        <input name="username" placeholder="Username" onChange={this.handleChange} />
        <br />
        <input name="email" placeholder="Email" onChange={this.handleChange} />
        <br />
        <input name="password" type="password" placeholder="Password" onChange={this.handleChange} />
        <br />
        <input name="password_repeat" type="password" placeholder="Repeat" onChange={this.handleChange} />
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