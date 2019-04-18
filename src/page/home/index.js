import React from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {isLogin} from '../../tool/api-helper';


export class Home extends React.Component {
  constructor(props) {
    super(props);
    // i18n
    this.text = Home.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    if (isLogin()) {
      return (
        <div>
          <div className={`${classes.blue} cell-wall`}>
          </div>
          <div className={`${classes.white} cell-wall`}>
            <div
              className="cell-membrane d-flex"
            >
              <div>
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                  className="rounded-circle img-fluid p-0 float-right"
                  style={{width: '8.67vw', height: '8.67vw', marginTop: '-4.335vw'}}
                  alt=""
                />
              </div>
              <div
                className="ml-3"
              >
                <p className={classes.name}>
                  用户名
                </p>
                <p className={classes.education}>
                  超级管理员
                </p>
                <p className={classes.position}>
                  后台管理
                </p>
              </div>
            </div>
          </div>
          <div className={`${classes.content} cell-wall `}>
            <div
              className="cell-membrane"
            >
              <div className="d-flex justify-content-center mb-3" style={{marginTop: '10vw'}}>
                <MDBBtn
                  className="px-4 mr-5 blue lighten-1"
                  color="info"
                  onClick={() => {
                    this.props.history.push('/search/job');
                  }}
                >
                  <MDBIcon icon="search mr-1 p-0" />
                  <span>查询职位</span>
                </MDBBtn>
                <MDBBtn
                  className="px-4 mr-5 blue lighten-1"
                  color="info"
                  onClick={() => {
                    this.props.history.push('/search/job');
                  }}
                >
                  <MDBIcon icon="plus mr-1 p-0" />
                  <span>添加职位</span>
                </MDBBtn>
                <MDBBtn
                  className="px-4 blue lighten-1"
                  color="info"
                  onClick={() => {
                    this.props.history.push('/search/job');
                  }}
                >
                  <MDBIcon icon="edit mr-1 p-0" />
                  <span>修改职位</span>
                </MDBBtn>
              </div>
              <div className="d-flex justify-content-center">
                <MDBBtn
                  className="px-4 mr-5 blue lighten-1"
                  color="info"
                  onClick={() => {
                    this.props.history.push('/search/company');
                  }}
                >
                  <MDBIcon icon="search mr-1 p-0" />
                  <span>查询公司</span>
                </MDBBtn>
                <MDBBtn
                  className="px-4 mr-5 blue lighten-1"
                  color="info"
                  onClick={() => {
                    this.props.history.push('/search/company');
                  }}
                >
                  <MDBIcon icon="plus mr-1 p-0" />
                  <span>添加公司</span>
                </MDBBtn>
                <MDBBtn
                  className="px-4 blue lighten-1"
                  color="info"
                  onClick={() => {
                    this.props.history.push('/search/company');
                  }}
                >
                  <MDBIcon icon="edit mr-1 p-0" />
                  <span>修改公司</span>
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<Redirect to='/login' />);
    }
  }
}

Home.i18n = [
  {},
  {}
];

Home.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
