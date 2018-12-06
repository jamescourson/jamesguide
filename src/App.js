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
    user: null
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
            <nav className="content-types">
              <a href="/">Games</a>
              <a href="/">Boards</a>
              <a href="/">Market</a>
            </nav>

            <Feed />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
