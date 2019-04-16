import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {MDBBtn, MDBIcon} from 'mdbreact';
// import {Breadcrumb} from '../general-component/breadcrumb';
import {Location} from '../general-component/location';
import classes from './index.module.css';
import {getAsync, put} from '../../tool/api-helper';
import {languageHelper} from '../../tool/language-helper';
import logo from '../CreateJob/logo.png';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class ModifyJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      edit: false,
      job_name: '',
      location: '',
      type: '',
      deadLine: '',
      worktime: '',
      job_description: '',
      job_duty: '',
      note: '',
      companyname: '',
      startTime: ''
    };
    // i18n
    this.text = ModifyJobReact.i18n[languageHelper()];
    this.backendGet = null;
    this.backendPut = null;
    // location
    this.location = null;
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation(data) {
    this.location = data;
  }

  async componentDidMount() {
    this.backendGet = await getAsync(`/jobs/${this.props.match.params.id}`);
    if (!this.backendGet.status.code.toString().startsWith('2')) {
      return;
    }
    // console.log(JSON.stringify(this.backendGet));
    /*
    this.backendPut = {
      id: this.backendGet.content.id,
      name: this.backendGet.content.name,
      organization_id: this.backendGet.content.organization.id,
      location: 
       { 
         nation_code: '999999',
         location_code: 'CHN'
       }
      ,
      type: '1',
      //dead_line: this.backendGet.content.deadLine,
      dead_line:'15070908800',
      job_description: this.backendGet.content.job_description,
      job_duty: this.backendGet.content.job_duty,
      //start_time:this.backendGet.content.startTime,
      //end_time: this.backendGet.content.deadLine,
      start_time:'15070908800',
      end_time: '15070908800',
    };
    */
    this.setState({
      render: 1,
      edit: false,
      job_name: this.backendGet.content.name,
      location: this.backendGet.content.location,
      type: this.backendGet.content.type,
      deadLine: this.backendGet.content.deadLine,
      job_duty: this.backendGet.content.job_duty,
      job_description: this.backendGet.content.job_description,
      note: this.backendGet.content.organization.note,
      companyname: this.backendGet.content.organization.name,
      startTime: this.backendGet.content.startTime,
    });
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    switch (this.state.render) {
      case 0:
        return null;
      case 1:
        return (
          <div className={classes.background}>
            <div className={`${classes.top} cell-wall d-flex align-items-end`}>
              {/*
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
              */}
            </div>
            <div className="cell-wall">
              <div className="cell-membrane">
                <div className="d-flex">
                  <div>
                    {
                      this.state.edit ? (
                        <div>
                          <div className={classes.jobcard}>
                            <div>
                              <div>
                                <img
                                  src={logo}
                                  style={{
                                    width: '5.62vw',
                                    height: 'auto',
                                  }}
                                />
                              </div>
                              <div className="d-flex mt-1">
                                <textarea
                                  placeholder="职位全称"
                                  value={this.state.job_name}
                                  className="form-control"
                                  style={{fontSize: '1.875vw'}}
                                  rows="1"
                                  onChange={(e) => {
                                    this.setState({
                                      job_name: e.target.value
                                    });
                                  }}
                                />
                              </div>
                              <div>
                                <div>
                                  <span>类型</span>
                                </div>
                                <textarea
                                  value={this.state.type}
                                  className="form-control mr-1"
                                  style={{fontSize: '1.09vw'}}
                                  rows="1"
                                  onChange={(e) => {
                                    this.setState({
                                      type: e.target.value
                                    });
                                  }}
                                />
                              </div>
                              <div>
                                <div>
                                  <span>申请截止日期</span>
                                </div>
                                <textarea
                                  value={this.state.deadLine}
                                  className="form-control"
                                  style={{fontSize: '1.09vw'}}
                                  rows="1"
                                  onChange={(e) => {
                                    this.setState({
                                      deadLine: e.target.value
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={classes.descontent}>
                            <div className={classes.name}>
                              职位描述
                            </div>
                            <div className={classes.note}>
                              <textarea
                                placeholder="描述"
                                value={this.state.job_description}
                                className="form-control"
                                style={{fontSize: '1.09vw'}}
                                rows="7"
                                onChange={(e) => {
                                  this.setState({
                                    job_description: e.target.value
                                  });
                                }}
                              />
                            </div>
                            <div className={classes.note}>
                              <textarea
                                placeholder="职责"
                                value={this.state.job_duty}
                                className="form-control"
                                style={{fontSize: '1.09vw'}}
                                rows="4"
                                onChange={(e) => {
                                  this.setState({
                                    job_duty: e.target.value
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={classes.jobcard}>
                            <div style={{width: '47.875vw'}}>
                              <div>
                                <img
                                  src={logo}
                                  style={{
                                    width: '5.62vw',
                                    height: 'auto',
                                  }}
                                />
                              </div>
                              <div className={classes.title}>
                                {this.state.job_name}
                              </div>
                              <div className={classes.detail}>
                                <Location code={this.state.location[0]} locate={this.getLocation} edit={false} />
                                <span>{` | ${this.state.startTime} - ${this.state.deadLine}`}</span>
                              </div>
                            </div>
                          </div>
                          <div className={classes.descontent}>
                            <div className={classes.name}>
                              职位描述
                            </div>
                            <div className={classes.note}>
                              <pre>{this.state.job_description}</pre>
                            </div>
                            <div className={classes.note}>
                              <pre>{this.state.job_duty}</pre>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        this.setState({
                          edit: true,
                        });
                      }}
                    >
                      {
                        this.state.edit ? (
                          <MDBBtn
                            className="py-2 ml-5 mt-5 blue lighten-1"
                            color="info"
                            style={{width: '11.71vw'}}
                            disabled
                          >
                            <MDBIcon icon="edit" className="mr-2" />
                            正在修改
                          </MDBBtn>
                        ) : (
                          <MDBBtn
                            className="py-2 ml-5 mt-5 blue lighten-1"
                            color="info"
                            style={{width: '11.71vw'}}
                          >
                            <MDBIcon icon="edit" className="mr-2" />
                            开始修改
                          </MDBBtn>
                        )
                      }
                    </div>
                    <MDBBtn
                      className="py-2 ml-5 mt-3 blue lighten-1"
                      color="info"
                      style={{width: '11.71vw'}}
                      onClick={() => {
                        this.backendPut.name = this.state.job_name;
                        this.backendPut.location = this.location;
                        //this.backendPut.type=this.state.type;
                        //this.backendPut.dead_line=this.state.deadLine;
                        //this.backendPut.end_time=this.state.deadLine;
                        this.backendPut.job_duty = this.state.job_duty;
                        this.backendPut.job_description = this.state.job_description;
                        //this.backendPut.organization.note=this.state.note;
                        //this.backendPut.organization.name=this.state.companyname;
                        //console.log(this.backendPut);
                        put(`/jobs/${this.backendPut.id}`, this.backendPut).then(() => {
                          this.setState({
                            edit: false
                          });
                        });
                      }}
                    >
                      <MDBIcon icon="archive" className="mr-2" />
                      保存修改
                    </MDBBtn>
                    <MDBBtn
                      className="py-2 ml-5 mt-3" color="light-green" style={{width: '11.71vw'}}
                      onClick={() => {
                        this.props.history.push('/create-job');
                      }}
                    >
                      <MDBIcon icon="pencil-alt" className="mr-2" />
                      新建职位
                    </MDBBtn>
                    <MDBBtn className="py-2 ml-5 mt-3" color="danger" style={{width: '11.71vw'}}>
                      <MDBIcon icon="pencil-alt" className="mr-2" />
                      删除公司
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
}

ModifyJobReact.i18n = [
  {},
  {}
];

ModifyJobReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const ModifyJob = (ModifyJobReact);
