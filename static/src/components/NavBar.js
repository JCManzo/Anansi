import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as authActions from '../actions/auth';
import * as dataActions from '../actions/data';
import SearchBar from './SearchBar';
import Avatar from '../../assets/av.png';
import './NavBar.scss';
import Modal from './Modal';
import PhotoDropzone from './PhotoDropzone';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    data: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, dataActions, authActions), dispatch);
}

function NavBarActions(props) {
  if (props.auth.isAuthenticated) {
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

        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#uploadModal"
          onClick={ () => props.uploadModalToggleRequest()}
        >Upload
        </button>

        {/* Upload modal */}
        <Modal show={props.data.isUploadModalOpen}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="uploadModalTitle">Upload an image</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <PhotoDropzone upload={props.data.uploadPhotoRequest}/>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={ () => props.uploadPhotosRequest() }
                >Upload
                </button>
              </div>
            </div>
          </div>
        </Modal>
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

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-dark">
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
            <li className="nav-item">
              <NavLink activeClassName="active"
                to="/home"
                className="nav-link"
                role="button"
              >Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                to="/profile"
                role="button"
                className="nav-link"
              >Profile
              </NavLink>
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
  uploadPhotosRequest: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
