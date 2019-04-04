import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

export class PubCompany extends React.Component {
  constructor(props) {
    super(props);
    // i18n
    this.text = PubCompany.i18n[languageHelper()];
  }

  render() {
    // remove redundant slash (/)
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    // render
    return (
      <div>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <span>Not Found</span>
          </div>
        </div>
      </div>
    );
  }
}

PubCompany.i18n = [
  {},
  {}
];

PubCompany.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
