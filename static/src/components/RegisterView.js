import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';
import './RegisterView.css';

function mapStateToProps(state) {
  return {
    isRegistering: state.auth.isRegistering,
    registerStatusText: state.auth.registerStatusText
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: ''
    };
  }

  register(e) {
    e.preventDefault();
    this.props.registerUser(this.state.email, this.state.username, this.state.password);
  }

  changeValue(e, type) {
    const newState = {};
    newState[type] = e.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div id="register-view-container" className="container">
        <h1>Anansi</h1>
        <p>Please register to get full access.</p>
        {
          this.props.registerStatusText &&
          <div className="alert alert-danger" role="alert">
            {this.props.registerStatusText}
          </div>
        }
        <form>
          <div className="form-group">
            <label htmlFor="userEmail" />
            <input
              type="email"
              className="form-control"
              name="email"
              id="userEmail"
              placeholder="Email"
              onChange={e => this.changeValue(e, 'email')}
            />
            <label htmlFor="userName" />
            <input
              type="text"
              className="form-control"
              name="username"
              id="userName"
              placeholder="Username"
              onChange={e => this.changeValue(e, 'username')}
            />
            <label htmlFor="userPassword" />
            <input
              type="password"
              className="form-control"
              name="password"
              id="userPassword"
              placeholder="Password"
              onChange={e => this.changeValue(e, 'password')}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={e => this.register(e)}
          >Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
