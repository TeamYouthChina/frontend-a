import React from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';
import {LightBox} from './picture/picture';
import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {MDBIcon} from 'mdbreact';

class CompanyPicReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CompanyPicReact.i18n[languageHelper()];
    // style
  }
 
  render() {
   
    return (
      <div className={classes.content}>
        <div className="d-flex justify-content-between">
          <div className={classes.name}>图片</div>
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
        <div className="d-flex mt-3 w-100 justify-content-center">
          <LightBox/>
        </div>
        

      </div>
    );
  }
}

CompanyPicReact.i18n = [
  {},
  {}
];

CompanyPicReact.propTypes = {
  // self
  align: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  intervalVw: PropTypes.number.isRequired,
  itemList: PropTypes.array.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const CompanyPic = withRouter(CompanyPicReact);
