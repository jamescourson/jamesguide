import React, { Component } from 'react';
import axios from 'axios';

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
        <button>Log in</button>
        <br /><br />
        <span>Not a member yet? </span>
        <button>Register</button>
      </form>
    )
  }
}

export default Login;