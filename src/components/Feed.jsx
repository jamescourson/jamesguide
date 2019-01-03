import React, { Component } from 'react';
import axios from 'axios';

import Forum from './boards/Forum';
import Profile from './Profile';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: []
    }
  }

  populate() {
    switch (this.props.type) {
      case 'boards':
        // Populate forums
        axios.get('https://james.guide/api/forums')
        .then(res => {
          let newForums = [];
          
          res.data.forEach(f => {
            newForums.push(
              <Forum uri={`/f/${f.id}`} view="preview" name={f.name} desc={f.description} key={newForums.length + 1}/>
            );
          });

          this.setState({ feed: newForums });
        });

        break;
      case 'users':
        // Get list of all users
        axios.get('https://james.guide/api/users')
        .then(res => {
          let newUsers = [];

          res.data.forEach(u => {
            newUsers.push(
              <Profile uri={`/u/${u.id}`} view="preview" user={u} key={newUsers.length + 1} />
            );
          });

          this.setState({ feed: newUsers });
        });

        break;
      default:
        break;
    }
  }

  componentWillMount() {
    this.populate();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.type !== this.props.type) {
      this.populate();
    }
  }

  render() {
    return this.state.feed;
  }
}

export default Feed;