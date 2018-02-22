import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Layout from './hoc/Layout/Layout';
import RecipeLanding from './containers/RecipeLanding/RecipeLanding';
import Auth from './containers/Auth/Auth';

const Routes = props => (
  <Switch>
    <Route path="/" exact>
      <RecipeLanding setPage={props.setPage} />
    </Route>
    <Route path="/signin" exact>
      <Auth setPage={props.setPage} signin />
    </Route>
    <Route path="/register" exact>
      <Auth setPage={props.setPage} register />
    </Route>
  </Switch>
);

Routes.propTypes = {
  setPage: PropTypes.func,
};

Routes.defaultProps = {
  setPage: null,
};

const App = () => (
  <Layout>
    <Routes />
  </Layout>
);

export default withRouter(App);
