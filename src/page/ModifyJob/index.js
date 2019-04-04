import React from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import {Breadcrumb} from '../general-component/breadcrumb';
import classes from './index.module.css';
import {content} from './index.mock';
import {KnowCompany} from './know-company';
import {JobCard} from './job-card';
import {JobDesci} from './job-descri';
import {SimilarJob} from './similar-job';

import {mockGetAsync} from '../../tool/api-helper';
import {MDBBtn, MDBIcon} from 'mdbreact';


class ModifyJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: {
        content:{
          id: null,
          name: null,
          organization:{
            id:null,
            name:null,
            avatarUrl: null,
            location: null,
            note: null
          },

          location: null,
          range:null,
          salary:null,
          worktime:null,
          type:null,
          job_description:
            null,
          job_duty:
            null,
        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = ModifyJobReact.i18n[languageHelper()];
  }
  async componentDidMount() {
   

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
                name: '搜索职位',
                subPath: '/search-job'
              },
              {
                name: '修改职位',
                subPath: '/modify-job'
              },

            ]}
          />
        </div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div className="d-flex">
              <div>
                <JobCard backend={this.state.backend}/>
                <JobDesci backend={this.state.backend}/>
                <KnowCompany backend={this.state.backend}/>
                <SimilarJob backend={this.state.backend}/>
              </div>
              <div >
                <MDBBtn className="py-2 ml-5 mt-5 blue lighten-1" color="info" style={{width:'11.71vw'}}>
                  <MDBIcon icon="archive" className="mr-2"/>
                  保存修改
                </MDBBtn>
                <MDBBtn className="py-2 ml-5 mt-3 blue lighten-1" color="info" style={{width:'11.71vw'}}>
                  <MDBIcon icon="pencil-alt" className="mr-2"/>
                  新建职位
                </MDBBtn>
                
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModifyJobReact.i18n = [
  {},
  {}
];

ModifyJobReact.propTypes = {
  // self

  // React Router
  backend: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const ModifyJob = (ModifyJobReact);