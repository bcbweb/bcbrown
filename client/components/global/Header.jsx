import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-title">
          <a href="/" className="header-link">
            <h1 className="logo-wrap">
                <span className="firstname">Benjamin</span>
                <span className="surname">Brown</span>
            </h1>
          </a>
          <h2 className="subtitle-wrap">
            <a href="/" className="subtitle">Web design &amp; development</a>
          </h2>
        </div>
      </header>
    );
  }
}

export default Header;
