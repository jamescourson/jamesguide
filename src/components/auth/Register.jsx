import React, { Component } from 'react';

class Register extends Component {
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