import React, { Component } from 'react';

class Welcome extends Component {
  state = {
    user: {
      name: 'Furgus'
    }
  }

  render() {
    return(
      <h3>Welcome, <b>{this.state.user.name}</b>!</h3>
    )
  }
}

export default Welcome;