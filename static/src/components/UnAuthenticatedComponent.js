import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import history from '../utils/history';
import { isTokenValid } from '../utils/http_funcs';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export function requireNoAuthentication(Component) {
  class UnAuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { loaded: false };
    }

    componentWillMount() {
      this.checkAuth();
    }

    // Invoked before a mounted component receives new props.
    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props = this.props) {
      if (props.isAuthenticated) {
        // Already authenticated, redirect back home.
        history.push('/home');
      } else {
        const token = localStorage.getItem('token');
        if (token) {
          // Validate token.
          isTokenValid(token)
            .then((jsonResponse) => {
              if (jsonResponse.token_is_valid) {
                // Token was validated successfully, reidrect home.
                this.props.loginUserSuccess(token);
                history.push('/home');
              } else {
                // Token is not valid!
                this.setState({ loaded: true });
              }
            });
        } else {
          // No token was found.
          this.setState({ loaded: true });
        }
      }
    }

    render() {
      return (
        <div>
          {
            !this.props.isAuthenticated && this.state.loaded
              ? <Component {...this.props} />
              : null
          }
        </div>
      );
    }
  }

  UnAuthenticatedComponent.propTypes = {
    loginUserSuccess: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  return connect(mapStateToProps, mapDispatchToProps)(UnAuthenticatedComponent);
}
