import React, { Component } from 'react';

import AuthBox from './AuthBox';

const authStates = {
  login: 'login',
  register: 'register',
  loggedIn: 'loggedIn'
}

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authState: authStates.login
    }
  }

  render() {
    return (
      <>
        <AuthBox type={this.state.authState} />

        <section>
          <h3>About</h3>
          <p>
            Welcome to James' Guide!<br />
            As you can see, there's not much here.
            Keep checking back for more updates, and help me out by registering!
          </p>
        </section>
      </>
    );
  }
}

export default Sidebar;