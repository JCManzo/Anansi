import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RegisterView from './components/RegisterView';
import LoginView from './components/LoginView';
import HomeView from './components/HomeView';
import ProfileView from './components/ProfileView';

import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/UnAuthenticatedComponent';

export default function buildRoutes(App) {
  return (
    <div>
      <Route component={App} />
      <Switch>
        <Route exact path="/home" component={requireAuthentication(HomeView)} />
        <Route exact path="/login" component={requireNoAuthentication(LoginView)} />
        <Route exact path="/register" component={requireNoAuthentication(RegisterView)} />
        <Route exact path="/profile" component={requireAuthentication(ProfileView)} />
      </Switch>
    </div>
  );
}
