import React, { Component } from 'react';

import AuthBox from './AuthBox';

class Sidebar extends Component {
  state = {
    content: [
      <AuthBox />
    ]
  }

  render() {
    return this.state.content;
  }
}

export default Sidebar;