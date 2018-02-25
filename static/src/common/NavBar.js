import React from 'react';
import SearchBar from './SearchBar';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand mb-0 h1" href="#">Anansi</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Photo Roll</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Profile</a>
          </li>
        </ul>
        <SearchBar />
      </div>
    </nav>
  );
}

export default NavBar;
