import React from 'react';
import SearchBar from './SearchBar';
import Avatar from '../../assets/av.png';
import './NavBar.scss';

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
        <div className="btn-toolbar ml-auto" role="group" aria-label="Auth buttons">
          <button className="btn btn-link" type="button">Log in</button>
          <a className="btn btn-primary" href="#" role="button">Sign up</a>
        </div>
        {/* <div id="nav-profile" className="nav-item">
          <img className="rounded-circle" alt="Profile image" src={Avatar} />
        </div> */}
      </div>
    </nav>
  );
}

export default NavBar;
