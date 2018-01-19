import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import RecipeLanding from './containers/RecipeLanding/RecipeLanding';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    let Routes = (props) => {
      return (
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
          <Redirect to="/" />
        </Switch>
      );
    };

    return (
      <Layout>
        <Routes />
      </Layout>
    );
  }
}

export default withRouter(App);
