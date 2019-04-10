import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    // i18n
    this.text = Login.i18n[languageHelper()];
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
          style={{background: '#FAFBFD',height:'62vw'}}
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
                    />
                    <MDBInput
                      label="Your password"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                    />
                    <p className="font-small blue-text d-flex justify-content-end pb-3">
                      Forgot
                      <a href="#!" className="blue-text ml-1">

                        Password?
                      </a>
                    </p>
                    <div className="text-center mb-3">
                      <MDBBtn
                        type="button"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                      >
                        Sign in
                      </MDBBtn>
                    </div>
                   
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">
                      Not a member?
                      <a href="#!" className="blue-text ml-1">

                        Sign Up
                      </a>
                    </p>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>

          </div>
        </div>
      </div>
    );
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
