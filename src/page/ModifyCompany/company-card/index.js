import React from 'react';
import PropTypes from 'prop-types';

import { withRouter} from 'react-router-dom';
import {MDBIcon} from 'mdbreact';


import classes from './index.module.css';

import logo from './logo.png';

import {languageHelper} from '../../../tool/language-helper';




class CompanyCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
   
    // i18n
    this.text = CompanyCardReact.i18n[languageHelper()];
    // style
  }
  
  render() {
    return (
      <div className={classes.companycard}>
        <div>
          <img
            src={logo}
            style={{
              width:'5.7vw',
              height:'auto',
            }}
          />
        </div>
        <div
          style={{
            marginLeft:'2.25vw',
            width:'47.25vw'
          }}>
          <div>
            <p
              style={{
                fontFamily: 'PingFang SC',
                lineHeight: 'normal',
                fontSize: '1.875vw',
                fontWeight:'bolder',
                color: '#454F69',
                marginBottom:'0.39vw'
              }}
            >
              {this.props.backend.content.name}
            </p>
            <p
              style={{
                fontFamily: 'PingFang SC',
                lineHeight: 'normal',
                fontSize: '0.875rem',
                color: '#8D9AAF',
                marginBottom:'0.39vw'
              }}
            > {this.props.backend.content.location} | 2000人 | 计算机/网络
            </p>
            <p
              style={{
                fontFamily: 'PingFang SC',
                lineHeight: 'normal',
                fontSize: '1rem',
                color: '#454F69',
                margin:'0'

              }}
            >
              <a href={this.props.backend.content.website}>{this.props.backend.content.website}</a>
            </p>
          </div>

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

CompanyCardReact.i18n = [
  {},
  {}
];

CompanyCardReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired
};

export const CompanyCard = withRouter(CompanyCardReact);