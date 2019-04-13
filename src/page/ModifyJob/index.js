import React from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import {Breadcrumb} from '../general-component/breadcrumb';
import classes from './index.module.css';


import {getAsync, put} from '../../tool/api-helper';
import {MDBBtn, MDBIcon} from 'mdbreact';
import logo from '../CreateJob/logo.png';
import amazon from './amazon.svg';


class ModifyJobReact extends React.Component {
  constructor(props) {
    super(props);

    
    // state
    this.state = {
     
      
      //编辑状态设置
      edit:false,
      //页面state
      job_name:'',
      location:'',
      type:'',
      deadLine:'',
      worktime:'',
      job_description:'',
      job_duty:'',
      note:'',
      companyname:'',
      startTime:''
      
      
    };
    // i18n
    this.text = ModifyJobReact.i18n[languageHelper()];
    this.backendGet = null;
    this.backendPut = null;
  }


  async componentDidMount() {
    this.backendGet = await getAsync(`/jobs/${this.props.match.params.id}`);
    if (!this.backendGet || !this.backendGet.status.code.toString().startsWith('2')) {
      return;
    }
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
    this.setState({
      edit: false,
      job_name: this.backendGet.content.name,
      location: this.backendGet.content.location,
      type:this.backendGet.content.type,
      deadLine: this.backendGet.content.deadLine,
      job_duty: this.backendGet.content.job_duty,
      job_description:this.backendGet.content.job_description,
      note: this.backendGet.content.organization.note,
      companyname:this.backendGet.content.organization.name,
      startTime:this.backendGet.content.startTime,
    });
  }
  
  
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.backendGet && this.backendGet.status.code.toString().startsWith('2')) ? (
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
                        <div className={classes.title}>({this.state.location}){this.state.job_name}</div>
                        <div
                          className={classes.detail}
                        >
                          {this.state.location} 
                          {' | '}
                          {this.state.startTime}{' ~ '}{this.state.deadLine}
                        </div>
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
                            value={this.state.type}
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
                  </div>
                )}

               
                
                
              
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
                    this.backendPut.name=this.state.job_name;
                    this.backendPut.location=this.location;
                    //this.backendPut.type=this.state.type;
                    //this.backendPut.dead_line=this.state.deadLine;
                    //this.backendPut.end_time=this.state.deadLine;
                    this.backendPut.job_duty=this.state.job_duty;
                    this.backendPut.job_description=this.state.job_description;
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
                  <MDBIcon icon="archive" className="mr-2"/>
                  保存修改

                </MDBBtn>
                <MDBBtn
                  className="py-2 ml-5 mt-3" color="light-green" style={{width:'11.71vw'}}
                  onClick={() => {
                    this.props.history.push('/create-job');
                  }}
                >
                  <MDBIcon icon="pencil-alt" className="mr-2"/>
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
    ):null;
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
  
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const ModifyJob = (ModifyJobReact);
