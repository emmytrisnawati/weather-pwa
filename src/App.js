import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/elements/ErrorBoundary';
import pages from './pages';

const App = ({ history, store }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ErrorBoundary>
          <Switch>
            <Route component={pages.Main} exact path="/" />
          </Switch>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default hot(App);

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
