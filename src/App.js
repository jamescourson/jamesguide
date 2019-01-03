// Import dependencies
import React, { Component } from 'react';

// Import CSS
import './css/main.css';

// Import images
import logo from './img/logo.png';

// Import components
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';

class App extends Component {
  state = {
    user: null,
    feedType: 'boards'
  }

  setFeedType = (e, newType) => {
    e.preventDefault();

    this.setState({ feedType: newType });
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <a href="/">
            <img src={ logo } className="header-logo" alt="James' Guide" />
          </a>
        </header>

        <main className="app-main">
          <aside className="main-sidebar">
            <Sidebar />
          </aside>

          <section className="main-content">
            <nav className="content-links">
              <a href="/boards" onClick={(e) => {this.setFeedType(e, 'boards')}}>Boards</a>
              <a href="/users" onClick={(e) => {this.setFeedType(e, 'users')}}>Users</a>
            </nav>

            <Feed type={this.state.feedType} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
