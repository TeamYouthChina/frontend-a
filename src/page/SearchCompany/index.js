import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from './index.module.css';
import {
  MDBIcon, MDBBtn
} from 'mdbreact';
import {Breadcrumb} from '../general-component/breadcrumb';
import {CompanyCard} from '../general-component/company-card';

import PropTypes from 'prop-types';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';



class SearchCompayReact extends React.Component {
  constructor(props) {
    super(props);
    this.text = SearchCompayReact.i18n[languageHelper()];

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
                name: '搜索公司',
                subPath: '/search-company'
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

            <div className="p-0 d-flex align-items-center">
              <MDBBtn className="px-4 py-1 ml-5 mb-4" outline color="blue" style={{borderRadius:'20px'}}>
                <MDBIcon icon="plus mr-1 p-0" style={{fontSize: '1.09vw'}} />
                添加公司
              </MDBBtn>
            </div>



          </div>


        </div>
        <div className="cell-wall" style={{background:'#F0F3FA',height:'80vw'}}>
          <div className="cell-membrane">
            <CompanyCard/>
          </div>
        </div>
      </div>
    );
  }
}

SearchCompayReact.i18n = [
  {},
  {}
];

SearchCompayReact.prototypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

};

export const SearchCompany = (SearchCompayReact);
