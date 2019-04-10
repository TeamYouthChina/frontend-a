import React from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';
import {MDBModal, MDBModalBody, MDBModalHeader,} from 'mdbreact';


import {languageHelper} from '../../../tool/language-helper';

export class SucceedReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      modal:false
    };
    // i18n
    this.text = SucceedReact.i18n[languageHelper()];
    // style
    if(this.props.code.toString().startsWith('2')){
      this.setState({
        modal:true
      });
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div
        className="cell-wall"
      >
        <div
          className="cell-membrane"
        >
          
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>提示</MDBModalHeader>
            <MDBModalBody>
              {this.props.text}
            </MDBModalBody>
           
          </MDBModal>

        </div>
      </div>

    );
  }
}

SucceedReact.i18n = [
  {},
  {}
];

SucceedReact.propTypes = {
  // self
  
  text: PropTypes.string.isRequired,
  code:PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Succeed = withRouter((SucceedReact));
