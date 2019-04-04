import React from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {MDBIcon} from 'mdbreact';

class JobDescriReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = JobDescriReact.i18n[languageHelper()];
    // style
  }

  render() {
    return (
      <div>
        <div className={classes.content}>
          <div className="d-flex justify-content-between">
            <div className={classes.name}>
              职位描述
            </div>
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
          
          <div className={classes.note}>{this.props.backend.content.job_description}</div>
          <div className={classes.note}>{this.props.backend.content.job_duty}</div>
        </div>
        
      </div>
    );
  }
}

JobDescriReact.i18n = [
  {},
  {}
];

JobDescriReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const JobDesci = withRouter(JobDescriReact);
