import React from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import classes from './index.module.css';
import {Breadcrumb} from '../general-component/breadcrumb';
import {CompanyCard} from './company-card';
import {CompanyDesci} from './company-descri';
import {CompanyJob} from './company-job';
import {CompanyPic} from './company-pic';
import {content} from './index.mock';

import {mockGetAsync} from '../../tool/api-helper';
import {MDBBtn, MDBIcon} from 'mdbreact';

class ModifyCompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: {
        content: {
          id: null,
          name: null,
          avatarUrl: null,
          location: null,
          website: null,
          note: null,
          nation: null,
        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = ModifyCompanyReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    // const requestedData = await getAsync();
    // this.setState({ cardData: requestedData, ...this.state });

    const requestedData = await mockGetAsync(content);
    this.setState({ ...this.state, backend: requestedData});
  }
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div className={classes.background}>
        <div className={`${classes.top} cell-wall d-flex align-items-end`}>
          <Breadcrumb

            itemList={[
              {
                name: '搜索公司',
                subPath: '/search-company'
              },
              {
                name: '修改公司',
                subPath: '/modify-company'
              },

            ]}
          />
        </div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div className="d-flex">
              <div>
                <CompanyCard backend={this.state.backend}/>
                <CompanyDesci backend={this.state.backend}/>
                <CompanyJob/>
                <CompanyPic/>
              </div>
              <div >
                <MDBBtn className="py-2 ml-5 mt-5 blue lighten-1" color="info" style={{width:'11.71vw'}}>
                  <MDBIcon icon="archive" className="mr-2"/>
                  保存修改
                </MDBBtn>
                <MDBBtn className="py-2 ml-5 mt-3 blue lighten-1" color="info" style={{width:'11.71vw'}}>
                  <MDBIcon icon="pencil-alt" className="mr-2"/>
                  发布职位
                </MDBBtn>
                <MDBBtn className="py-2 ml-5 mt-3 blue lighten-1" color="info" style={{width:'11.71vw'}}>
                  <MDBIcon icon="pencil-alt" className="mr-2"/>
                  新建公司
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModifyCompanyReact.i18n = [
  {},
  {}
];

ModifyCompanyReact.propTypes = {
  // self

  // React Router
  backend: PropTypes.object.isRequired,
  
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const ModifyCompany = (ModifyCompanyReact);
