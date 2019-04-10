import React from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import {Breadcrumb} from '../general-component/breadcrumb';
import classes from './index.module.css';
import {MDBBtn, MDBIcon} from 'mdbreact';
import logo from './logo.png';
import amazon from './amazon.svg';
import {put} from '../../tool/api-helper';


class CreateJobReact extends React.Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      
      //编辑状态设置
      edit:true,
      //页面state
      job_name:'',
      location:'',
      type:'',
      deadLine:'',
      worktime:'',
      job_description:'',
      job_duty:'',
      note:'',
      companyname:''


    };
    // i18n
    this.text = CreateJobReact.i18n[languageHelper()];
    this.backendPut = null;
  }

  async componentDidMount() {
    
    this.backendPut = {
      id: null,
      name: null,
      organization: {
        id: null,
        name: null,
        avatarUrl: null,
        //location: null,
        website: null,
        note: null,
        nation: null
      },
      location: null,
      type: null,
      deadLine: null,
      job_description: null,
      job_duty: null

    };
    
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
                name: '新建职位',
                subPath: '/create-job'
              },

            ]}
          />
        </div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div className="d-flex">
              <div>
                {this.state.edit===false?(
                  <div>
                    <div className={classes.jobcard}>
                      <div style={{width:'47.875vw'}}>
                        <div>
                          <img
                            src={logo}
                            style={{
                              width:'5.62vw',
                              height:'auto',
                            }}
                          />
                        </div>
                        <div className={classes.title}>({this.state.location}){this.state.job_name}</div>
                        
                        <div
                          className={classes.detail}
                        >
                          {this.state.location} |
                          {this.state.type} |
                          {this.state.deadLine}
                        </div>
                        <div className="red-text h6">API没有</div>
                      </div>


                    </div>

                    <div className={classes.descontent}>

                      <div className={classes.name}>
                          职位描述
                      </div>


                      <div
                        className={classes.note}
                      >
                        <pre>{this.state.job_description}</pre>
                      </div>
                      <div>

                      </div>
                      <div className={classes.note}><pre>{this.state.job_duty}</pre></div>


                    </div>
                    <div className={classes.knowcontent}>

                      <div className={classes.name}>了解公司</div>


                      <div>
                        <img src={amazon}/>
                        <span className={classes.company}>{this.state.companyname}</span>
                      </div>
                      <div className={classes.note}><pre>{this.state.note}</pre></div>
                    </div>

                    <div className={classes.simcontent}>

                      <div className={classes.name}>相似职位</div>


                      <br/>
                      <p className="h1 red-text">相似职位API没有</p>
                    </div>


                  </div>

                ):
                  (<div>
                    <div className={classes.jobcard}>
                      <div>
                        <div>
                          <img
                            src={logo}
                            style={{
                              width:'5.62vw',
                              height:'auto',
                            }}
                          />
                        </div>
                        <div className="d-flex mt-1">
                          <textarea
                            value={this.state.location}
                            placeholder="地点"
                            className="form-control mr-2"
                            style={{fontSize:'1.875vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                location:e.target.value
                              });
                            }}/>
                          <textarea
                            value={this.state.job_name}
                            placeholder="工作名称"
                            className="form-control"
                            style={{fontSize:'1.875vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                job_name:e.target.value
                              });
                            }}
                          />
                        </div>
                        <div className="d-flex mt-1">
                          <textarea
                            value={this.state.location}
                            placeholder="地点"
                            className="form-control mr-1"
                            style={{fontSize:'1.09vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                location:e.target.value
                              });
                            }}/>
                         
                          <textarea
                            value={this.state.type}
                            placeholder="类型"
                            className="form-control mr-1"
                            style={{fontSize:'1.09vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                type:e.target.value
                              });
                            }}
                          />
                          <textarea
                            value={this.state.deadLine}
                            placeholder="截止时间"
                            className="form-control"
                            style={{fontSize:'1.09vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                deadLine:e.target.value
                              });
                            }}
                          />

                        </div>
                        <div className="red-text h6">API没有</div>
                      </div>


                    </div>

                    <div className={classes.descontent}>

                      <div className={classes.name}>
                        职位描述
                      </div>


                      <div className={classes.note}>
                        <textarea
                          value={this.state.job_description}
                          placeholder="职位描述"
                          className="form-control"
                          style={{fontSize:'1.09vw'}}
                          rows="7"
                          onChange={(e)=>{
                            this.setState({
                              job_description:e.target.value
                            });
                          }}
                        />
                      </div>
                      <div className={classes.note}>
                        <textarea
                          value={this.state.job_duty}
                          placeholder="职位需求"
                          className="form-control"
                          style={{fontSize:'1.09vw'}}
                          rows="4"
                          onChange={(e)=>{
                            this.setState({
                              job_duty:e.target.value
                            });
                          }}
                        />
                      </div>


                    </div>
                    <div className={classes.knowcontent}>

                      <div className={classes.name}>了解公司</div>


                      <div>
                        <img src={amazon}/>
                        <span className={classes.company}>
                          <textarea
                            value={this.state.companyname}
                            placeholder="公司名"
                            className="form-control mr-1"
                            style={{fontSize:'1.09vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                companyname:e.target.value
                              });
                            }}
                          />
                        </span>
                      </div>
                      <div className={classes.note}>
                        <textarea
                          value={this.state.note}
                          placeholder="公司详情"
                          className="form-control mr-1"
                          style={{fontSize:'1.09vw'}}
                          rows="8"
                          onChange={(e)=>{
                            this.setState({
                              note:e.target.value
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className={classes.simcontent}>

                      <div className={classes.name}>相似职位</div>


                      <br/>
                      <p className="h1 red-text">相似职位API没有</p>
                    </div>


                  </div>)}






              </div>
              <div>
                <div
                  onClick={()=>{
                    this.setState({
                      edit:true,
                    });
                  }}
                >
                  {this.state.edit?(
                    <MDBBtn
                      className="py-2 ml-5 mt-5 blue lighten-1"
                      color="info"
                      style={{width:'11.71vw'}}
                      disabled
                    >
                      <MDBIcon icon="edit" className="mr-2"/>
                      正在创建
                    </MDBBtn>
                  ):(
                    <MDBBtn
                      className="py-2 ml-5 mt-5 blue lighten-1"
                      color="info"
                      style={{width:'11.71vw'}}
                    >
                      <MDBIcon icon="edit" className="mr-2"/>
                      开始创建
                    </MDBBtn>
                  )
                  }
                </div>
                <MDBBtn
                  className="py-2 ml-5 mt-3 blue lighten-1"
                  color="info"
                  style={{width:'11.71vw'}}
                  onClick={()=>{
                    this.backendPut.name=this.state.job_name;
                    this.backendPut.location=this.location;
                    this.backendPut.type=this.state.type;
                    this.backendPut.deadLine=this.state.deadLine;
                    this.backendPut.job_duty=this.state.job_duty;
                    this.backendPut.job_description=this.state.job_description;
                    this.backendPut.organization.note=this.state.note;
                    this.backendPut.organization.name=this.state.companyname;
                    put(`/jobs/${this.backendPut.id}`, this.backendPut).then(() => {
                      this.setState({
                        edit: false
                      });
                    });
                  }}
                >
                  
                  <MDBIcon icon="archive" className="mr-2"/>
                  保存职位
                </MDBBtn>


              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateJobReact.i18n = [
  {},
  {}
];

CreateJobReact.propTypes = {
  // self

  // React Router
  backend: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const CreateJob = (CreateJobReact);
