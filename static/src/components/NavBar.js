import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../actions/auth';
import SearchBar from './SearchBar';
import Avatar from '../../assets/av.png';
import './NavBar.scss';
import history from '../utils/history';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

function NavBarActions(props) {
  if (props.isAuthenticated) {
    return (
      <div>
        <div id="nav-profile" className="dropdown" role="group" aria-label="Profile menu">
          <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="dropdownMenuToggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img className="rounded-circle" alt="Profile avatar" src={Avatar} />
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuToggle"
          >
            <button
              className="dropdown-item"
              onClick={e => props.logOut(e)}
            >Log out
            </button>
          </div>
        </div>
        <button className="btn btn-success">Upload</button>
      </div>
    );
  }

  return (
    <div>
      <Link to="/login" role="button" className="btn btn-link">Log in</Link>
      <Link to="/register" role="button" className="btn btn-primary">Sign up</Link>
    </div>
  );
}

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  logOut(e) {
    e.preventDefault();
    this.props.logOutAndRedirect();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark">
        <Link to="/home" role="button" className="navbar-brand mb-0 h1">Anansi</Link>
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
              <Link to="/home" role="button" className="nav-link">Home</Link>
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
            <NavBarActions {...this.props} />
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  logOutAndRedirect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
