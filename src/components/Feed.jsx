import React, { Component } from 'react';
import axios from 'axios';

import Forum from './boards/Forum';

const feedTypes = {
  games: 0,
  boards: 1,
  market: 2
}

class Feed extends Component {
  state = {
    feedType: feedTypes.boards,
    feed: []
  }

  setFeedType(newFeedType) {
    this.state.feedType = newFeedType;
  }

  populate() {
    switch (this.state.feedType) {
      case feedTypes.games:

        break;
      case feedTypes.boards:
        // Populate forums
        axios.get('https://james.guide/api/forums')
        .then(res => {
          let newForums = [];
          
          res.data.forEach(f => {
            newForums.push(
              <Forum name={f.name} desc={f.description} key={newForums.length + 1}/>
            );
          });

          this.setState({ feed: newForums });
        });
        break;
      case feedTypes.market:

        break;
      default:
      
        break;
    }
  }

  componentWillMount() {
    this.populate();
  }

  render() {
    return this.state.feed;
  }
}

export default Feed;