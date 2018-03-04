import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';
import './LoginView.css';

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      email_error_text: null,
      password_error_text: null,
      disabled: true
    };
  }

  isDisabled() {
    let emailIsValid = false;
    let passwordIsValid = false;

    if (!this.state.email) {
      this.setState({ email_error_text: null });
    } else {
      // TODO: Validate email with regex
      emailIsValid = true;
    }

    if (!this.state.password) {
      this.setState({ password_error_text: null });
    } else if (this.state.password.length >= 4) {
      passwordIsValid = true;
      this.setState({ password_error_text: null });
    } else {
      this.setState({
        password_error_text: 'Password of incorrect length.'
      });
    }

    if (emailIsValid && passwordIsValid) {
      this.setState({ disabled: false });
    }
  }

  login(e) {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  }

  changeValue(e, type) {
    const newState = {};
    newState[type] = e.target.value;

    // Validate fields after field states has been updated.
    this.setState(newState, () => this.isDisabled());
  }

  render() {
    return (
      <div id="login-view-container" className="container">
        <h1>Anansi</h1>
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
            disabled={this.state.disabled}
            type="submit"
            className="btn btn-primary"
            onClick={e => this.login(e)}
          >Log in
          </button>
        </form>
        {
          this.props.statusText &&
          <div className="alert alert-danger" role="alert">
            {this.props.statusText}
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
