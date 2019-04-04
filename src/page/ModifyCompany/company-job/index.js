import React from 'react';


import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {MDBIcon} from 'mdbreact';

class CompanyJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CompanyJobReact.i18n[languageHelper()];
    // style
  }

  render() {
    return (
      <div className={classes.content}>
        <div className="d-flex justify-content-between">
          <div className={classes.name}>在招职位</div>
          <div
            style={{
              justifyContent:'flex-end',
              alignSelf:'flex-start',
              color: '#8D9AAF',
            }}
          >
            <MDBIcon far icon="edit" />
          </div>
        </div>
       
        <br/>
        <p className="h1 red-text">该公司在招职位API没有</p>
      </div>
    );
  }
}

CompanyJobReact.i18n = [
  {},
  {}
];

CompanyJobReact.propTypes = {
  
};

export const CompanyJob = withRouter(CompanyJobReact);
