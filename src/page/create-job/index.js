import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import {MDBBtn, MDBIcon, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions,MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import {Breadcrumb} from '../general-component/breadcrumb';
import {Location} from '../general-component/location';
import classes from './index.module.css';
import {getAsync,post} from '../../tool/api-helper';
import {languageHelper} from '../../tool/language-helper';
import logo from './logo.png';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {Select} from 'antd';
import {TagModal} from '../create-company/tag-component/tagModal';


class CreateJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      name: '',
      organizationId: props.match.params.id,
      location: ['110000'],
      typeId: '1',
      duty: '',
      description: '',
      companyName: '',
      startTime: new Date(),
      deadLine: new Date(),
      mail: '',
      value:'搜索我的标签',
      select:[],
      select_code:[],
      modal:false
    };
    // i18n
    this.text = CreateJobReact.i18n[languageHelper()];
    this.backendGet = null;
    this.backendPut = null;
    // location
    this.location = null;
    this.select=[];
    this.select_code=[];
    this.dic=[];
    this.getLocation = this.getLocation.bind(this);
    // function
    this.save = this.save.bind(this);
  }

  getLocation(data) {
    this.location = data;
  }
  async componentDidMount(){

    let tag=await getAsync('/static/dictionaries?type=label');
    tag.content.map((item)=> {
      this.dic.push(item.name);
    });
    this.setState({
      render:1,
      //backend:await getAsync(`/labels/${this.props.type}/${this.props.id}`),
      tag:tag,
      //children:children
    });
  }
  save() {
    const backendPost = {
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
    if (this.select_code.length>50){
      this.setState({
        modal:true
      });
    } 
    else{
      post('/jobs', backendPost).then((data) => {
        if (data.status.code.toString().startsWith('2')) {
          this.setState({
            select_code:this.select_code,
          });
          for (let i=0;i<this.select_code.length;i+=1){
            post(
              '/labels',
              {label_code:this.select_code[i],target_id:parseInt(`${data.content.id}`),target_type:300}
            );
          }
          alert('新增成功。');
          this.props.history.push(`/job/${data.content.id}`);
        } else {
          throw data;
        }
      });
    }
  }
  handleChange=(value)=> {
    this.code=this.dic.indexOf(value)+1;
    this.select.push(value);
    this.select_code.push(this.code.toString());
    this.setState({
      value: value,
      select:this.select
      //select:this.state.select.concat([value])
    });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    switch (this.state.render) {
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
                    name: '新建职位',
                    subPath: pathname
                  },
                ]}
              />
            </div>
            <div className="cell-wall">
              <div className="cell-membrane">
                <div className="d-flex">
                  <div>
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
                        <div className={classes.name}>
                          标签
                        </div>
                        <Select
                          tags
                          showSearch
                          allowClear={true}
                          style={{ width: '100%' }}
                          searchPlaceholder="标签模式"
                          value={this.state.value}
                          onChange={this.handleChange}
                          className="mt-2"
                        >
                          {
                            this.state.tag.content.map((item)=>{
                              return(
                                <Select.Option key={item.name}>{item.name}</Select.Option>
                              );
                            })
                          }

                        </Select>
                        <div className="d-flex mt-3 flex-wrap justify-content-start">
                          {
                            this.state.select.map((item,index)=>{
                              return(
                                <TagModal key={index} tag={item}/>
                              );
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <MDBBtn
                      className="py-2 ml-5 mt-5 blue lighten-1"
                      color="info"
                      style={{width: '11.71vw'}}
                      onClick={this.save}
                    >
                      <MDBIcon icon="pencil-alt" className="mr-2" />
                      <span>保存</span>
                    </MDBBtn>
                  </div>
                  <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>提示</MDBModalHeader>
                    <MDBModalBody>
                      您只能添加一个标签
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
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

CreateJobReact.i18n = [
  {},
  {}
];

CreateJobReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CreateJob = (CreateJobReact);
