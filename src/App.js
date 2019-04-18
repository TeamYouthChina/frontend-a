import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import {CreateCompany} from './page/create-company';
import {CreateJob} from './page/create-job';
import {Home} from './page/home';
import {Login} from './page/login';
import {ModifyCompany} from './page/modify-company';
import {ModifyJob} from './page/modify-job';
import {NoFound} from './page/no-found';
import {SearchCompany} from './page/search-company';
import {SearchJob} from './page/search-job';
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
            component={routeProps => <Home {...routeProps} />}
          />
          <Route
            path="/company/:id/job/create"
            component={routeProps => <CreateJob {...routeProps} />}
          />
          <Route
            path="/company/create"
            component={routeProps => <CreateCompany {...routeProps} />}
          />
          <Route
            path="/company/:id"
            component={routeProps => <ModifyCompany {...routeProps} />}
          />
          <Route
            path="/job/:id"
            component={routeProps => <ModifyJob {...routeProps} />}
          />
          <Route
            path="/login"
            component={routeProps => <Login {...routeProps} />}
          />
          <Route
            path="/page-no-found"
            component={routeProps => <NoFound {...routeProps} />}
          />
          <Route
            path="/search/company"
            component={routeProps => <SearchCompany {...routeProps} />}
          />
          <Route
            path="/search/job"
            component={routeProps => <SearchJob {...routeProps} />}
          />
          <Route
            path="/search"
            component={() => <Redirect to="/search/company" />}
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
