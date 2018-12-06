import React, { Component } from 'react';

import Login from './auth/Login';
import Register from './auth/Register';
import Welcome from './auth/Welcome';

const authStates = {
  login: <Login />,
  register: <Register />,
  loggedIn: <Welcome />
}

class AuthBox extends Component {
  state = {
    authType: authStates.login,
    content: <Login />
  }

  update() {
    // fetch user loggedin data from API
    // update this.state.authType accordingly
    this.setState({
      authType: authStates.login,
      content: <Login />
    });
  }

  componentWillMount() {
    this.update();
  }

  render() {
    return this.state.content;
  }
}

export default AuthBox;