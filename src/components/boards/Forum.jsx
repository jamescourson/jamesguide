import React, { Component } from "react";

import Topic from './Topic';

class Forum extends Component {
  getTopics = () => {
    let topics = [];

    this.props.topics.forEach(t => {
      topics.push(
        <Topic uri={`/t/${t.id}`} view="preview" name={t.name} user={t.user} forum={t.forum} />
      );
    });

    return topics;
  }

  render() {
    switch (this.props.view) {
      case 'preview':
        return (
          <a href={this.props.uri} className="forum">
            <h1 className="forum-title">{this.props.name}</h1>
            <p className="forum-desc">{this.props.desc}</p>
          </a>
        );
      case 'full':
        return (
          <div className="forum">
              <h1 className="forum-title">{this.props.name}</h1>
              <div className="forum-topics">
                {this.getTopics()}
              </div>
          </div>
        );
      default:
        break;
    }
  }
}

export default Forum;