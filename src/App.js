import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import {CreateCompany} from './page/CreateCompany';
import {CreateJob} from './page/CreateJob';
import {Home} from './page/Home';
import {ModifyCompany} from './page/ModifyCompany';
import {ModifyJob} from './page/ModifyJob';
import {NoFound} from './page/no-found';
import {SearchCompany} from './page/SearchCompany';
import {SearchJob} from './page/SearchJob';

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
            component={() => <Redirect to="/home" />}
          />
          <Route
            path="/home"
            component={routeProps => <Home {...routeProps} />}
          />
          <Route
            path="/create-company"
            component={routeProps => <CreateCompany {...routeProps} />}
          />
          <Route
            path="/create-job"
            component={routeProps => <CreateJob {...routeProps} />}
          />
          <Route
            path="/modify-company"
            component={routeProps => <ModifyCompany {...routeProps} />}
          />
          <Route
            path="/modify-job"
            component={routeProps => <ModifyJob {...routeProps} />}
          />
          <Route
            path="/page-no-found"
            component={routeProps => <NoFound {...routeProps} />}
          />
          <Route
            path="/search-company"
            component={routeProps => <SearchCompany {...routeProps} />}
          />
          <Route
            path="/search-job"
            component={routeProps => <SearchJob {...routeProps} />}
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
