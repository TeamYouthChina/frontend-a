import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import {NoFound} from './page/no-found';
import {Unauthorized} from './page/Unauthorized';
import {languageHelper} from './tool/language-helper';

export class App extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = App.i18n[languageHelper()];
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Redirect to="/unauthorized" />}
          />
          <Route
            path="/unauthorized"
            component={routeProps => <Unauthorized {...routeProps} />}
          />
          <Route
            path="/page-no-found"
            component={routeProps => <NoFound {...routeProps} />}
          />
          <Redirect to="/page-no-found" />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.i18n = [
  {},
  {}
];

App.propTypes = {};
