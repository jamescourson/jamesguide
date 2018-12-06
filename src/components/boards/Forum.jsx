import React, { Component } from "react";

class Forum extends Component {
  render() {
    return (
      <div className="forum">
        <h1><a href={this.props.uri}>{this.props.name}</a></h1>
        <p>{this.props.desc}</p>
      </div>
    )
  }
}

export default Forum;