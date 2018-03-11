import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';
import { isTokenValid } from '../utils/http_funcs';
import history from '../utils/history';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.setState({ loaded_if_needed: false });
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props = this.props) {
      if (!props.isAuthenticated) {
        // Not authenticated, check for JTW token.
        const token = localStorage.getItem('token');
        if (!token) {
          // No token exists, unable to authenticate. Redirect to login page.
          history.push('/login');
        } else {
          // Found a token. Let's validate against server.
          isTokenValid(token)
            .then((respose) => {
              // Valid token. Proceed with login.
              this.props.loginUserSuccess(token);
              this.setState({ loaded_if_needed: true });
            })
            .catch((error) => {
                // Couldn't verify token was legit. Redirect to login page.
                history.push('/login');
            });
        }
      } else {
       // Already authenticated.
        this.setState({ loaded_if_needed: true });
      }
    }

    render() {
      return (
        <div>
          {
            this.props.isAuthenticated && this.state.loaded_if_needed
              ? <Component {...this.props} />
              : null
          }
        </div>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
