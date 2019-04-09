import React from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import {Breadcrumb} from '../general-component/breadcrumb';
import classes from './index.module.css';
import {content} from './index.mock';

import {mockGetAsync} from '../../tool/api-helper';
import {MDBBtn, MDBIcon} from 'mdbreact';
import logo from '../CreateJob/logo.png';
import amazon from './amazon.svg';


class ModifyJobReact extends React.Component {
  constructor(props) {
    super(props);

    
    // state
    this.state = {
      //Data set
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
      
      //编辑状态设置
      edit:false,
      //页面state
      job_name:'',
      location:'',
      salary:'',
      range:'',
      worktime:'',
      job_description:'',
      job_duty:'',
      note:'',
      companyname:''
      
      
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
                        <div className={classes.title}>({this.state.backend.content.location}){this.state.backend.content.name}</div>
                        <div className={classes.date}>{this.state.backend.content.date}</div>
                        <div
                          className={classes.detail}
                        >
                          {this.state.backend.content.location} |
                          {this.state.backend.content.worktime} |
                          {this.state.backend.content.salary} |
                          {this.state.backend.content.range}
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
                        <pre>{this.state.backend.content.job_description}</pre>
                      </div>
                      <div>
                    
                      </div>
                      <div className={classes.note}><pre>{this.state.backend.content.job_duty}</pre></div>


                    </div>
                    <div className={classes.knowcontent}>

                      <div className={classes.name}>了解公司</div>


                      <div>
                        <img src={amazon}/>
                        <span className={classes.company}>{this.state.backend.content.organization.name}</span>
                      </div>
                      <div className={classes.note}><pre>{this.state.backend.content.organization.note}</pre></div>
                    </div>

                    <div className={classes.simcontent}>

                      <div className={classes.name}>相似职位</div>


                      <br/>
                      <p className="h1 red-text">相似职位API没有</p>
                    </div>


                  </div>
                  
                ):(
                  <div>
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
                            className="form-control mr-2"
                            style={{fontSize:'1.875vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                location:e.target.value
                              });
                            }}
                            
                          />
                         
                          <textarea
                            value={this.state.job_name}
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
                        <div className={classes.date}>{this.state.backend.content.date}</div>
                        <div className="d-flex mt-1">
                          <textarea
                            value={this.state.location}
                            className="form-control mr-1"
                            style={{fontSize:'1.09vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                location:e.target.value
                              });
                            }}
                          />
                          <textarea
                            value={this.state.worktime}
                            className="form-control mr-1"
                            style={{fontSize:'1.09vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                worktime:e.target.value
                              });
                            }}
                          />
                          <textarea
                            value={this.state.salary}
                            className="form-control mr-1"
                            style={{fontSize:'1.09vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                salary:e.target.value
                              });
                            }}
                          />
                          <textarea
                            value={this.state.range}
                            className="form-control"
                            style={{fontSize:'1.09vw'}}
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                range:e.target.value
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


                  </div>
                )}

               
                
                
              
              </div>
              <div>
                <div
                  onClick={()=>{
                    this.setState({
                      edit:true,
                      job_name:this.state.backend.content.name,
                      location:this.state.backend.content.location,
                      salary:this.state.backend.content.salary,
                      range:this.state.backend.content.range,
                      worktime:this.state.backend.content.worktime,
                      job_duty:this.state.backend.content.job_duty,
                      job_description:this.state.backend.content.job_description,
                      note:this.state.backend.content.organization.note,
                      companyname:this.state.backend.content.organization.name
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
                      正在修改
                    </MDBBtn>
                  ):(
                    <MDBBtn
                      className="py-2 ml-5 mt-5 blue lighten-1"
                      color="info"
                      style={{width:'11.71vw'}}
                    >
                      <MDBIcon icon="edit" className="mr-2"/>
                      开始修改
                    </MDBBtn>
                  )
                  }
                 
                 
                </div>
                <MDBBtn 
                  className="py-2 ml-5 mt-3 blue lighten-1" 
                  color="info" 
                  style={{width:'11.71vw'}}

                  onClick={()=>{
                    const tempbackend = {
                      backend: {
                        content: {
                          id:this.state.backend.content.id,
                          name: this.state.job_name,
                          organization: {
                            id: this.state.backend.content.organization.id,
                            name: this.state.companyname,
                            avatarUrl: this.state.backend.content.organization.avatarUrl,
                            location: this.state.location,
                            note: this.state.note
                          },

                          location: this.state.location,
                          range: this.state.range,
                          salary: this.state.salary,
                          worktime: this.state.worktime,
                          type: null,
                          job_description: this.state.job_description,
                          job_duty: this.state.job_duty
                        },
                        status: {
                          code: this.state.backend.status.code,
                          reason: this.state.backend.status.reason,
                        },
                      },

                    };
                    this.setState({
                      edit:false,
                      backend:tempbackend.backend
                    });
                  }
                  }
                >
                  <MDBIcon icon="archive" className="mr-2"/>
                  保存修改
                 
                </MDBBtn>
                <MDBBtn
                  className="py-2 ml-5 mt-3 blue lighten-1" color="info" style={{width:'11.71vw'}}
                  onClick={() => {
                    this.props.history.push('/create-job');
                  }}
                >
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
  history: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const ModifyJob = (ModifyJobReact);
