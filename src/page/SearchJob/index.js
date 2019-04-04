import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from './index.module.css';
import {
  MDBIcon, MDBBtn
} from 'mdbreact';
import {JobCard} from '../general-component/job-card';
import PropTypes from 'prop-types';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {Breadcrumb} from '../general-component/breadcrumb';



class SearchJobReact extends React.Component {
  constructor(props) {
    super(props);
    this.text = SearchJobReact.i18n[languageHelper()];

    this.state = {

    };

  }

  render() {
    // eslint-disable-next-line
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }

    return (
      <div
        style={{
          padding: 0,
        }}
      >
        <div className={`${classes.blue} cell-wall d-flex align-items-end`}>
          <Breadcrumb

            itemList={[
              {
                name: '搜索职位',
                subPath: '/search-job'
              },

            ]}
          />
        </div>
        <div className={`${classes.white} cell-wall`}>
          <div className="cell-membrane">


            <div className="my-4 p-0 d-flex align-items-center">
              <MDBIcon className={`${classes.searchIcon} mr-1 mr-md-3`} icon="search" size="2x" />
              <input
                className={`flex-fill p-0 form-control ${classes.searchInput}`}
                placeholder=" 搜索公司"
                style={{
                  fontSize: '1.09vw',
                  width: '80vw'
                }} />
            </div>


            <div className="mb-4 p-0 d-flex align-items-center">
              <MDBIcon className={`${classes.searchIcon} mr-1 mr-md-3`} icon="search" size="2x" />
              <input
                className={`flex-fill p-0 form-control mr-5 ${classes.searchInput}`}
                placeholder=" 输入职位"
                style={{
                  fontSize: '1.09vw',
                  width: '40vw'
                }} />
              <MDBIcon className={`${classes.searchIcon} mr-1 mr-md-3`} icon="search" size="1x" />
              <input
                className={`flex-fill p-0 form-control ${classes.searchInput}`}
                placeholder=" 输入公司"
                style={{
                  fontSize: '1.09vw',
                  width: '40vw'
                }} />
            </div>

            <div className="p-0 d-flex align-items-center">
              <MDBBtn className="px-4 py-1 ml-5 mb-4" outline color="blue" style={{borderRadius:'20px'}}>
                <MDBIcon icon="plus mr-1 p-0" style={{fontSize: '1.09vw'}} />
                添加公司
              </MDBBtn>
              <MDBBtn className="px-4 py-1 ml-3 mb-4" outline color="blue" style={{borderRadius:'20px'}}>
                <MDBIcon icon="plus mr-1 p-0" />
                添加职位
              </MDBBtn>
            </div>
          </div>
        </div>

        <div className="cell-wall" style={{background:'#F0F3FA', height:'80vw'}}>
          <div className="cell-membrane">
            <JobCard/>
          </div>
        </div>
      </div>
    );
  }
}

SearchJobReact.i18n = [
  {},
  {}
];

SearchJobReact.prototypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

};

export const SearchJob = (SearchJobReact);
         
