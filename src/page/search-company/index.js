import React from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Breadcrumb} from '../general-component/breadcrumb';
import {CompanyCard} from '../general-component/company-card';
import classes from './index.module.css';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {get, isLogin} from '../../tool/api-helper';

class SearchCompanyReact extends React.Component {
  constructor(props) {
    super(props);
    this.text = SearchCompanyReact.i18n[languageHelper()];
    this.state = {
      searchString: '',
      searching: false,
      companyIdList: []
    };
    //
    this.search = this.search.bind(this);
  }

  search() {
    get(`/search?type=company&text=${this.state.searchString}&page=0`).then((data) => {
      let companyIdList = [];
      if (data.status.code.toString().startsWith('2')) {
        data.content.data.forEach((item) => {
          companyIdList.push(item.content.id);
        });
      }
      this.setState({
        searching: false,
        companyIdList: companyIdList
      });
    });
    this.setState({
      searching: true
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
                  name: '搜索公司',
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
                  placeholder="搜索公司"
                  value={this.state.searchString}
                  style={{
                    fontSize: '1.09vw',
                    width: '60vw'
                  }}
                  onChange={(e) => {
                    this.setState({
                      searchString: e.target.value
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
                  onClick={this.search}
                  disabled={this.state.searching}
                >
                  <span>{this.state.searching ? '搜索中...' : '搜索'}</span>
                </MDBBtn>
              </div>
              <div className="p-0 d-flex align-items-center">
                <MDBBtn
                  className="px-4 py-1 ml-5 mb-4"
                  outline color="blue"
                  style={{borderRadius: '20px'}}
                  onClick={() => {
                    this.props.history.push('/company/create');
                  }}
                >
                  <MDBIcon icon="plus mr-1 p-0" style={{fontSize: '1.09vw'}} />
                  添加公司
                </MDBBtn>

              </div>
            </div>
          </div>
          <div className="cell-wall" style={{background: '#F0F3FA', height: '80vw'}}>
            <div className="cell-membrane">
              {
                this.state.companyIdList.length === 0 ? (
                  <div><span>无结果</span></div>
                ) : null
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

SearchCompanyReact.i18n = [
  {},
  {}
];

SearchCompanyReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const SearchCompany = (SearchCompanyReact);
