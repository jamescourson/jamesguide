import React, { Component } from 'react';
import axios from 'axios';

import Login from './auth/Login';
import Register from './auth/Register';
import Welcome from './auth/Welcome';

const authStates = {
  login: 'login',
  register: 'register',
  loggedIn: 'loggedIn'
}

// getAuthData - fetches user auth status from API
function getAuthData() {
  axios.get('https://james.guide/auth')
  .then(res => {
    console.log('then')
    return res.data ? authStates.loggedIn : authStates.login;
  })
  .catch(res => {
    console.log('catch')
    return authStates.login;
  });
}

class AuthBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authType: this.props.type
    }
  }

  componentWillMount = () => {
    this.setState({
      authType: getAuthData()
    });
  }

  // switch - switches authbox state
  switch = () => {
    if (this.state.authType === authStates.login) {
      this.setState({
        authType: authStates.register
      });
    }
    else {
      this.setState({
        authType: authStates.login
      });
    }
  }

  render() {
    switch(this.state.authType) {
      case authStates.login:
        return (<Login switch={this.switch} />);
      case authStates.register:
        return (<Register switch={this.switch} />);
      case authStates.loggedIn:
        console.log('logged in')
        return (<Welcome />);
      default:
        return (<Login switch={this.switch} />);
    }
  }
}

export default AuthBox;