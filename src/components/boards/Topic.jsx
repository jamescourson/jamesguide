import React, {Component} from 'react';

class Topic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.view) {
      case 'preview':
        return (
          <a href={this.props.uri} className="topic">
            <h2 className="topic-name">{this.props.name}</h2>
            <div className="topic-info">
              Posted by <a href={`/u/${this.props.user}`} className="topic-user">{this.props.user}</a>
              in <span>{this.props.forum}</span>
            </div>
          </a>
        );
      case 'full':
        return (
          <div className="topic">
            {/* full view */}
          </div>
        );
      default:
        break;
    }
  }
}

export default Topic;