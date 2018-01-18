import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import RecipeLanding from './containers/RecipeLanding/RecipeLanding';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={RecipeLanding} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
