import React from 'react';
import {MDBBtn} from 'mdbreact';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Breadcrumb} from '../general-component/breadcrumb';
import {CompanyCard} from '../general-component/company-card';
import {JobCard} from '../general-component/job-card';
import classes from './index.module.css';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {get, isLogin} from '../../tool/api-helper';


class SearchJobReact extends React.Component {
  constructor(props) {
    super(props);
    this.text = SearchJobReact.i18n[languageHelper()];
    this.state = {
      searchJobString: '',
      searchCompanyString: '',
      searching: false,
      jobIdList: [],
      job: false,
      companyIdList: [],
      company: false
    };
    //
    this.searchJob = this.searchJob.bind(this);
    this.searchCompany = this.searchCompany.bind(this);
  }

  searchJob() {
    get(`/search?type=job&text=${this.state.searchJobString}&page=0`).then((data) => {
      let jobIdList = [];
      if (data.status.code.toString().startsWith('2')) {
        data.content.data.forEach((item) => {
          jobIdList.push(item.content.id);
        });
      }
      this.setState({
        searching: false,
        jobIdList: jobIdList,
        job: true,
        companyIdList: [],
      });
    });
    this.setState({
      searching: true,
      job: false,
      company: false,
    });
  }

  searchCompany() {
    get(`/search?type=company&text=${this.state.searchCompanyString}&page=0`).then((data) => {
      let companyIdList = [];
      if (data.status.code.toString().startsWith('2')) {
        data.content.data.forEach((item) => {
          companyIdList.push(item.content.id);
        });
      }
      this.setState({
        searching: false,
        jobIdList: [],
        companyIdList: companyIdList,
        company: true
      });
    });
    this.setState({
      searching: true,
      job: false,
      company: false,
    });
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    if (isLogin()) {
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
                  subPath: pathname
                },
              ]}
            />
          </div>
          <div className={`${classes.white} cell-wall`}>
            <div className="cell-membrane">
              <div className="my-4 p-0 d-flex align-items-center">
                <input
                  className={`flex-fill p-0 form-control ${classes.searchInput}`}
                  placeholder="搜索职位"
                  value={this.state.searchJobString}
                  style={{
                    fontSize: '1.09vw',
                    width: '60vw'
                  }}
                  onChange={(e) => {
                    this.setState({
                      searchJobString: e.target.value
                    });
                  }}
                />
                <MDBBtn
                  className=""
                  color="blue"
                  style={{
                    fontSize: '1.09vw',
                    width: '10vw'
                  }}
                  onClick={this.searchJob}
                  disabled={this.state.searching}
                >
                  <span>{this.state.searching ? '搜索中...' : '搜索'}</span>
                </MDBBtn>
                {this.state.job ? <span>搜索结果</span> : null}
              </div>
              <div className="my-4 p-0 d-flex align-items-center">
                <input
                  className={`flex-fill p-0 form-control ${classes.searchInput}`}
                  placeholder="搜索公司"
                  value={this.state.searchCompanyString}
                  style={{
                    fontSize: '1.09vw',
                    width: '60vw'
                  }}
                  onChange={(e) => {
                    this.setState({
                      searchCompanyString: e.target.value
                    });
                  }}
                />
                <MDBBtn
                  className=""
                  color="blue"
                  style={{
                    fontSize: '1.09vw',
                    width: '10vw'
                  }}
                  onClick={this.searchCompany}
                  disabled={this.state.searching}
                >
                  <span>{this.state.searching ? '搜索中...' : '搜索'}</span>
                </MDBBtn>
                {this.state.company ? <span>搜索结果</span> : null}
              </div>
            </div>
          </div>
          <div className="cell-wall" style={{background: '#F0F3FA', height: '80vw'}}>
            <div className="cell-membrane">
              {
                this.state.jobIdList.map((item, index) => {
                  return <JobCard key={index} id={item} />;
                })
              }
              {
                this.state.companyIdList.map((item, index) => {
                  return <CompanyCard key={index} id={item} />;
                })
              }
            </div>
          </div>
        </div>
      );
    } else {
      return (<Redirect to='/login' />);
    }
  }
}

SearchJobReact.i18n = [
  {},
  {}
];

SearchJobReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

};

export const SearchJob = (SearchJobReact);
         
