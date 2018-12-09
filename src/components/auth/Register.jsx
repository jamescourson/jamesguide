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

    let allFieldsFilled = !Object.values(registerData).includes(null);
    let passwordsMatch = registerData.password === this.state.data.password_repeat;
    
    if (allFieldsFilled && passwordsMatch) {
      // Hash password
      registerData.password = bcrypt.hashSync(registerData.password, 10);

      axios.post('https://james.guide/api/register', registerData)
      .then(res => {
        console.log(res);
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.attemptRegister} className="register" method="post">
        <h3>Register for James' Guide.</h3>
        <input name="username" placeholder="Username" onChange={this.handleChange} />
        <br />
        <input name="email" placeholder="Email" onChange={this.handleChange} />
        <br />
        <input name="password" type="password" placeholder="Password" onChange={this.handleChange} />
        <br />
        <input name="password_repeat" type="password" placeholder="Repeat" onChange={this.handleChange} />
        <br />
        <button type="submit">Register</button>
        <br /><br />
        <span>Already a member? </span>
        <button type="button" onClick={this.props.switch}>Login</button>
      </form>
    )
  }
}

export default Register;