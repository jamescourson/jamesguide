import React, { Component } from 'react';

import AuthBox from './AuthBox';

class Sidebar extends Component {
  state = {
    content: <>
      <AuthBox />

      <section>
        <h3>About</h3>
        <p>
          Welcome to James' Guide!<br />
          Help me out by signing up, and keep checking back for updates!<br />
          The database may be wiped multiple times.
        </p>
      </section>
    </>
  }

  render() {
    return this.state.content;
  }
}

export default Sidebar;