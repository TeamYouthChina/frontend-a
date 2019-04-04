import React from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';
import amazon from '../amazon.svg';
import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {MDBIcon} from 'mdbreact';

class KnowCompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = KnowCompanyReact.i18n[languageHelper()];
    // style
  }

  render() {
    return (
      <div>
        <div className={classes.content}>
          <div className="d-flex justify-content-between">
            <div className={classes.name}>了解公司</div>
            <div
              style={{
                justifyContent:'flex-end',
                alignSelf:'flex-start',
                color: '#8D9AAF',
              }}
            >
              <MDBIcon far icon="edit"/>
            </div>
          </div>
          <div>
            <img src={amazon}/>
            <span className={classes.company}>{this.props.backend.content.organization.name}</span>
          </div>
          <div className={classes.note}>{this.props.backend.content.organization.note}</div>
        </div>
        
      </div>
    );
  }
}

KnowCompanyReact.i18n = [
  {},
  {}
];

KnowCompanyReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const KnowCompany = withRouter(KnowCompanyReact);
