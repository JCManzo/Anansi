import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
// import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import './index.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import buildRoutes from './routes';
import history from './utils/history';

// Create redux store with custom middleware
const store = createStore(reducers, applyMiddleware(thunk));

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} >
        <Router history={history}>
          {buildRoutes(Component)}
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default);
  });
}

// Look into thhis
registerServiceWorker();
