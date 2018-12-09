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
    content: null
  }

  componentWillMount = () => {
    this.setState({
      authType: authStates.login,
      content: <Login switch={this.switch} />
    });
  }

  switch = () => {
    if (this.state.authType === authStates.login) {
      this.setState({
        authType: authStates.register,
        content: <Register switch={this.switch} />
      });
    }
    else {
      this.setState({
        authType: authStates.login,
        content: <Login switch={this.switch} />
      });
    }
  }

  render() {
    return this.state.content;
  }
}

export default AuthBox;