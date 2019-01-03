import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        
      }
    }
  }

  render() {
    switch (this.props.view) {
      case "preview":
        return (
          <div className="profile">
            <h1>{this.props.user.username}</h1>
          </div>
        );

        break;
      case "full":

        break;
      default:
        break;
    }
    return (
      <>
        <h1></h1>
      </>
    );
  }
}

export default Profile;