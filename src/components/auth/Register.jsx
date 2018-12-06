import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    data: {
      username: null,
      email: null,
      password: null
    }
  }

  handleChange = (e) => {
    let newData = this.state.data;
    newData[e.target.name] = e.target.value;

    this.setState({ data: newData });
  }

  attemptRegister = (e) => {
    e.preventDefault();

    axios.post('https://james.guide/api/register', this.state.data)
    .then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <form className="register">
        <h3>Register for James' Guide.</h3>
        <input placeholder="Username" />
        <br />
        <input placeholder="Email" />
        <br />
        <input placeholder="Password" />
        <br />
        <input placeholder="Repeat" />
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