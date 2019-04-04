import React from 'react';
import PropTypes from 'prop-types';

import { withRouter} from 'react-router-dom';


import classes from './index.module.css';

import logo from './logo.png';

import {languageHelper} from '../../../tool/language-helper';
import {MDBIcon} from 'mdbreact';




class JobCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
   
    // i18n
    this.text = JobCardReact.i18n[languageHelper()];
    // style
  }
  
  render() {
    return (
      <div className={classes.jobcard}>
        <div style={{width:'47.875vw'}}>
          <div>
            <img
              src={logo}
              style={{
                width:'5.62vw',
                height:'auto',
              }}
            />
          </div>
          <div className={classes.title}>({this.props.backend.content.location}){this.props.backend.content.name}</div>
          <div className={classes.date}>{this.props.backend.content.date}</div>
          <div 
            className={classes.detail}
          >
            {this.props.backend.content.location} | 
            {this.props.backend.content.worktime} | 
            {this.props.backend.content.salary} | 
            {this.props.backend.content.range}
          </div>
          <div className="red-text h6">API没有</div>
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
    );
  }
}

JobCardReact.i18n = [
  {},
  {}
];

JobCardReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired
};

export const JobCard = withRouter(JobCardReact);