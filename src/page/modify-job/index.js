import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import {MDBBtn, MDBIcon, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions} from 'mdbreact';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import {Breadcrumb} from '../general-component/breadcrumb';
import {Location} from '../general-component/location';
import classes from './index.module.css';
import {getAsync, isLogin, put} from '../../tool/api-helper';
import {languageHelper} from '../../tool/language-helper';
import logo from '../create-job/logo.png';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class ModifyJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      edit: false,
      name: '',
      organizationId: '',
      location: [],
      typeId: '',
      duty: '',
      description: '',
      companyName: '',
      startTime: null,
      deadLine: null,
      mail: ''
    };
    // i18n
    this.text = ModifyJobReact.i18n[languageHelper()];
    this.backendGet = null;
    this.backendPut = null;
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
      name: this.state.name,
      organization_id: this.state.organizationId,
      location: [{
        location_code: this.location.code,
        nation_code: this.location.countryCode
      }],
      type: this.state.typeId,
      dead_line: this.state.deadLine.getTime(),
      start_time: this.state.startTime.getTime(),
      job_description: this.state.description,
      job_duty: this.state.duty,
      mail: this.state.mail
    };
    put(`/jobs/${this.props.match.params.id}`, backendPut).then((data) => {
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
    this.backendGet = await getAsync(`/jobs/${this.props.match.params.id}`);
    if (!this.backendGet.status.code.toString().startsWith('2')) {
      return;
    }
    this.setState({
      render: 1,
      edit: false,
      name: this.backendGet.content.name,
      organizationId: this.backendGet.content.organization.id,
      location: this.backendGet.content.location,
      typeId: (() => {
        switch (this.backendGet.content.type) {
          case '实习':
            return '1';
          case '兼职':
            return '2';
          case '全职':
            return '3';
          default:
            return '0';
        }
      })(),
      duty: this.backendGet.content.job_duty,
      description: this.backendGet.content.job_description,
      companyName: this.backendGet.content.organization.name,
      startTime: new Date(this.backendGet.content.start_time),
      deadLine: new Date(this.backendGet.content.dead_line),
      mail: this.backendGet.content.mail
    });
    // console.log('this.backendGet.content.deadLine', this.backendGet.content.dead_line);
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
            <div className={classes.background}>
              <div className={`${classes.top} cell-wall d-flex align-items-end`}>
                <Breadcrumb
                  itemList={[
                    {
                      name: '搜索职位',
                      subPath: '/search/job'
                    },
                    {
                      name: '修改职位',
                      subPath: pathname
                    },
                  ]}
                />
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
                                    alt=""
                                  />
                                </div>
                                <div className="d-flex mt-1">
                                  <textarea
                                    placeholder="职位全称"
                                    value={this.state.name}
                                    className="form-control"
                                    style={{fontSize: '1.875vw'}}
                                    rows="1"
                                    onChange={(e) => {
                                      this.setState({
                                        name: e.target.value
                                      });
                                    }}
                                  />
                                </div>
                                <hr />
                                <div>
                                  <span>工作地点：</span>
                                  <br />
                                  <Location code={this.state.location[0]} locate={this.getLocation} edit={true} />
                                </div>
                                <hr />
                                <div>
                                  <span>工作类型：</span>
                                  <br />
                                  <MDBSelect
                                    getValue={(data) => {
                                      this.setState({
                                        typeId: data[0]
                                      });
                                    }}
                                  >
                                    <MDBSelectInput selected="" />
                                    <MDBSelectOptions>
                                      <MDBSelectOption
                                        checked={this.state.typeId === '1'}
                                        value='1'
                                      >
                                        实习
                                      </MDBSelectOption>
                                      <MDBSelectOption
                                        checked={this.state.typeId === '2'}
                                        value='2'
                                      >
                                        兼职
                                      </MDBSelectOption>
                                      <MDBSelectOption
                                        checked={this.state.typeId === '3'}
                                        value='3'
                                      >
                                        全职
                                      </MDBSelectOption>
                                    </MDBSelectOptions>
                                  </MDBSelect>
                                </div>
                                <hr />
                                <div>
                                  <span>申请截止时间（{dateFormat(this.state.deadLine, 'Z')}）：</span>
                                  <br />
                                  <DateTimePicker
                                    calendarIcon={null}
                                    className={classes['enable-select']}
                                    onChange={(date) => {
                                      // console.log('[Previous State]');
                                      // console.log('string:', this.state.deadLine);
                                      // console.log('time stamp:', this.state.deadLine ? this.state.deadLine.getTime() : null);
                                      this.setState({
                                        deadLine: date ? date : new Date(),
                                      }, () => {
                                        // console.log('[State]');
                                        // console.log('string:', this.state.deadLine);
                                        // console.log('time stamp:', this.state.deadLine ? this.state.deadLine.getTime() : null);
                                      });
                                    }}
                                    value={this.state.deadLine}
                                  />
                                </div>
                                <hr />
                                <div>
                                  <span>工作开始时间（{dateFormat(this.state.startTime, 'Z')}）：</span>
                                  <br />
                                  <DateTimePicker
                                    calendarIcon={null}
                                    className={classes['enable-select']}
                                    onChange={(date) => {
                                      this.setState({
                                        startTime: date ? date : new Date(),
                                      });
                                    }}
                                    value={this.state.startTime}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={classes.descontent}>
                              <div className={classes.name}>
                                HR 邮箱
                              </div>
                              <div className={classes.note}>
                                <textarea
                                  placeholder="描述"
                                  value={this.state.mail}
                                  className="form-control"
                                  style={{fontSize: '1.09vw'}}
                                  rows="1"
                                  onChange={(e) => {
                                    this.setState({
                                      mail: e.target.value
                                    });
                                  }}
                                />
                              </div>
                              <div className={classes.name}>
                                职位描述
                              </div>
                              <div className={classes.note}>
                                <textarea
                                  placeholder="描述"
                                  value={this.state.description}
                                  className="form-control"
                                  style={{fontSize: '1.09vw'}}
                                  rows="7"
                                  onChange={(e) => {
                                    this.setState({
                                      description: e.target.value
                                    });
                                  }}
                                />
                              </div>
                              <div className={classes.note}>
                                <textarea
                                  placeholder="职责"
                                  value={this.state.duty}
                                  className="form-control"
                                  style={{fontSize: '1.09vw'}}
                                  rows="4"
                                  onChange={(e) => {
                                    this.setState({
                                      duty: e.target.value
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
                                    alt=""
                                  />
                                </div>
                                <div className={classes.title}>
                                  {this.state.name}
                                </div>
                                <div className={classes.detail}>
                                  <span>工作地点：</span>
                                  <Location code={this.state.location[0]} locate={this.getLocation} edit={false} />
                                </div>
                                <div className={classes.detail}>
                                  <span>工作类型：
                                    {
                                      (() => {
                                        switch (this.state.typeId) {
                                          case '1':
                                            return '实习';
                                          case '2':
                                            return '兼职';
                                          case '3':
                                            return '全职';
                                          default:
                                            return '';
                                        }
                                      })()
                                    }
                                  </span>
                                </div>
                                <div className={classes.detail}>
                                  <span>申请截止日期：{dateFormat(this.state.deadLine, 'yyyy年mm月dd日 hh:MM:ss')}</span>
                                </div>
                                <div className={classes.detail}>
                                  <span>工作开始日期：{dateFormat(this.state.startTime, 'yyyy年mm月dd日 hh:MM:ss')}</span>
                                </div>
                              </div>
                            </div>
                            <div className={classes.descontent}>
                              <div className={classes.name}>
                                HR 邮箱
                              </div>
                              <div className={classes.note}>
                                <pre>{this.state.mail}</pre>
                              </div>
                              <div className={classes.name}>
                                职位描述
                              </div>
                              <div className={classes.note}>
                                <pre>{this.state.description}</pre>
                              </div>
                              <div className={classes.note}>
                                <pre>{this.state.duty}</pre>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                    <div>
                      {
                        this.state.edit ? (
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
                          <div>
                            <MDBBtn
                              className="py-2 ml-5 mt-5 blue lighten-1"
                              color="info"
                              style={{width: '11.71vw'}}
                              onClick={this.modify}
                            >
                              <MDBIcon icon="edit" className="mr-2" />
                              <span>修改</span>
                            </MDBBtn>
                            <MDBBtn
                              className="py-2 ml-5 mt-3 "
                              color="yellow"
                              style={{width: '11.71vw'}}
                              onClick={() => {
                                this.props.history.push(`/company/${this.state.organizationId}`);
                              }}
                            >
                              <MDBIcon icon="pencil-alt" className="mr-2" />
                              <span>查看公司</span>
                            </MDBBtn>
                          </div>
                        )
                      }
                    </div>
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
