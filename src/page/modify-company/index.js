import React from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Breadcrumb} from '../general-component/breadcrumb';
import {Location} from '../general-component/location';
import classes from './index.module.css';
import {getAsync, isLogin, put} from '../../tool/api-helper';
import {languageHelper} from '../../tool/language-helper';
import logo from './logo.png';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {JobCard} from '../general-component/job-card';

class ModifyCompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      edit: false,
      name: '',
      avatarUrl: '',
      location: null,
      website: '',
      note: '',
      jobIdList: []
    };
    // i18n
    this.text = ModifyCompanyReact.i18n[languageHelper()];
    // get
    this.backendGet = null;
    // location
    this.location = null;
    this.getLocation = this.getLocation.bind(this);
    // function
    this.modify = this.modify.bind(this);
    this.save = this.save.bind(this);
  }

  getLocation(data) {
    this.location = data;
  }

  modify() {
    this.setState({
      edit: true
    });
  }

  save() {
    const backendPut = {
      avatarUrl: this.state.avatarUrl,
      id: this.props.match.params.id,
      location: {
        location_code: this.location.code,
        nation_code: this.location.countryCode
      },
      name: this.state.name,
      nation: this.location.countryCode,
      note: this.state.note,
      website: this.state.website
    };
    put(`/companies/${backendPut.id}`, backendPut).then((data) => {
      if (data.status.code.toString().startsWith('2')) {
        this.setState({
          location: this.location.code
        });
        alert('修改成功（如果你修改了地点，那么将于下次刷新时显示新值）。');
      } else {
        throw data;
      }
    });
    this.setState({
      edit: false
    });
  }

  async componentDidMount() {
    this.backendGet = await getAsync(`/companies/${this.props.match.params.id}`);
    if (!this.backendGet.status.code.toString().startsWith('2')) {
      return;
    }
    const temp = await getAsync(`/companies/${this.props.match.params.id}/jobs?page=0`);
    let jobIdList = [];
    if (temp.status.code.toString().startsWith('2')) {
      temp.content.data.forEach((item) => {
        jobIdList.push(item.id);
      });
    }
    this.setState({
      render: 1,
      edit: false,
      name: this.backendGet.content.name,
      avatarUrl: this.backendGet.content.avatarUrl,
      location: this.backendGet.content.location,
      website: this.backendGet.content.website,
      note: this.backendGet.content.note,
      jobIdList: jobIdList
    });
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    if (isLogin()) {
      switch (this.state.render) {
        case 0:
          return null;
        case 1:
          return (
            <div>
              <div className={`${classes.top} cell-wall d-flex align-items-end`}>
                <Breadcrumb
                  itemList={[
                    {
                      name: '搜索公司',
                      subPath: '/search/company'
                    },
                    {
                      name: '修改公司',
                      subPath: pathname
                    },
                  ]}
                />
              </div>
              <div
                className={`${classes.background} cell-wall`}
              >
                <div className="cell-membrane">
                  <div className="d-flex">
                    <div>
                      {
                        this.state.edit ? (
                          <div>
                            <div className={classes.companycard}>
                              <div>
                                <img
                                  src={logo}
                                  alt=""
                                  style={{
                                    width: '5.7vw',
                                    height: 'auto',
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  marginLeft: '2.25vw',
                                  width: '47.25vw'
                                }}
                              >
                                <div>
                                  <input
                                    type="text"
                                    style={{
                                      fontFamily: 'PingFang SC',
                                      lineHeight: 'normal',
                                      fontSize: '1.875vw',
                                      fontWeight: 'bolder',
                                      color: '#454F69',
                                      marginBottom: '0.39vw'
                                    }}
                                    placeholder="公司全称"
                                    value={this.state.name}
                                    className="form-control mr-2"
                                    onChange={(e) => {
                                      this.setState({
                                        name: e.target.value
                                      });
                                    }}
                                  />
                                  <Location code={this.state.location} locate={this.getLocation} edit={true} />
                                  <input
                                    type="text"
                                    style={{
                                      fontFamily: 'PingFang SC',
                                      lineHeight: 'normal',
                                      fontSize: '1rem',
                                      color: '#454F69',
                                      margin: '0'
                                    }}
                                    placeholder="公司主页"
                                    value={this.state.website}
                                    className="form-control mr-2"
                                    onChange={(e) => {
                                      this.setState({
                                        website: e.target.value
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={classes.content}>
                              <div className={classes.name}>
                                概况
                              </div>
                              <br />
                              <textarea
                                style={{fontSize: '1.09vw'}}
                                value={this.state.note}
                                className="form-control mr-2"
                                rows="9"
                                onChange={(e) => {
                                  this.setState({
                                    note: e.target.value
                                  });
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className={classes.companycard}>
                              <div>
                                <img
                                  src={logo}
                                  alt=""
                                  style={{
                                    width: '5.7vw',
                                    height: 'auto',
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  marginLeft: '2.25vw',
                                  width: '47.25vw'
                                }}>
                                <div>
                                  <p
                                    style={{
                                      fontFamily: 'PingFang SC',
                                      lineHeight: 'normal',
                                      fontSize: '1.875vw',
                                      fontWeight: 'bolder',
                                      color: '#454F69',
                                      marginBottom: '0.39vw'
                                    }}
                                  >
                                    {this.state.name}
                                  </p>
                                  <div>
                                    <Location code={this.state.location} locate={this.getLocation} edit={false} />
                                  </div>
                                  <p
                                    style={{
                                      fontFamily: 'PingFang SC',
                                      lineHeight: 'normal',
                                      fontSize: '1rem',
                                      color: '#454F69',
                                      margin: '0'
                                    }}
                                  >
                                    <a href={this.state.website}>{this.state.website}</a>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className={classes.content}>
                              <div className={classes.name}>
                                概况
                              </div>
                              <br />
                              <pre className={classes.note}>
                                {this.state.note}
                              </pre>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div>
                      {this.state.edit ? (
                        <MDBBtn
                          className="py-2 ml-5 mt-5 blue lighten-1"
                          color="info"
                          style={{width: '11.71vw'}}
                          onClick={this.save}
                        >
                          <MDBIcon icon="pencil-alt" className="mr-2" />
                          <span>保存</span>
                        </MDBBtn>
                      ) : (
                        <MDBBtn
                          className="py-2 ml-5 mt-5 blue lighten-1"
                          color="info"
                          style={{width: '11.71vw'}}
                          onClick={this.modify}
                        >
                          <MDBIcon icon="edit" className="mr-2" />
                          <span>修改</span>
                        </MDBBtn>
                      )}
                      <MDBBtn
                        className="py-2 ml-5 mt-3 "
                        color="light-green"
                        style={{width: '11.71vw'}}
                        onClick={() => {
                          this.props.history.push(`/company/${this.props.match.params.id}/job/create`);
                        }}
                      >
                        <MDBIcon icon="pencil-alt" className="mr-2" />
                        <span>新建职位</span>
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.background} cell-wall`}
              >
                <div className="cell-membrane">
                  <div
                    className={classes.name}
                    style={{
                      marginTop: '2vw'
                    }}
                  >
                    全部职位
                  </div>
                  <div>
                    {
                      this.state.jobIdList.map((item, index) => {
                        return <JobCard key={index} id={item} />;
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    } else {
      return (<Redirect to='/login' />);
    }
  }
}

ModifyCompanyReact.i18n = [
  {},
  {}
];

ModifyCompanyReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const ModifyCompany = (ModifyCompanyReact);
