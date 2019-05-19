import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow} from 'mdbreact';

import {isLogin, post} from '../../tool/api-helper';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      email: '',
      password: ''
    };
    // i18n
    this.text = Login.i18n[languageHelper()];
    // function
    this.login = this.login.bind(this);
  }

  login() {
    post('/login', {id: 1, password: '123456'});
  }

  render() {
    // remove redundant slash (/)
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    if (isLogin()) {
      return (<Redirect to='/' />);
    } else {
      return (
        <div>
          <div
            className="cell-wall"
            style={{background: '#FAFBFD', height: '62vw'}}
          >
            <div
              className="cell-membrane"
            >

              <MDBRow center className="mt-5 pt-5">
                <MDBCol size="4">
                  <MDBCard>
                    <MDBCardBody className="mx-4">
                      <div className="text-center">
                        <h3 className="dark-grey-text mb-5">
                          <strong>Admin Sign In</strong>
                        </h3>
                      </div>
                      <MDBInput
                        label="Your email"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        getValue={(value) => {
                          this.setState({
                            email: value
                          });
                        }}
                      />
                      <MDBInput
                        label="Your password"
                        group
                        type="password"
                        validate
                        containerClass="mb-0"
                        getValue={(value) => {
                          this.setState({
                            password: value
                          });
                        }}
                      />
                      <div className="text-center mb-3">
                        <MDBBtn
                          type="button"
                          gradient="blue"
                          rounded
                          className="btn-block z-depth-1a"
                          onClick={() => {
                            post('/login', {identifier: this.state.email, password: this.state.password}).then((data) => {
                              if (data.status.code.toString().startsWith('2')) {
                                this.props.history.push('/');
                              } else {
                                alert('用户名或密码错误。');
                              }
                            });
                          }}
                        >
                          Sign in
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>

            </div>
          </div>
        </div>
      );
    }
  }
}

Login.i18n = [
  {},
  {}
];

Login.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
