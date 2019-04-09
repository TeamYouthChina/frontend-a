import React from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import classes from './index.module.css';
import {Breadcrumb} from '../general-component/breadcrumb';

import {CompanyPic} from './company-pic';
import {getAsync} from '../../tool/api-helper';
import {MDBBtn, MDBIcon} from 'mdbreact';
import logo from './logo.png';

class ModifyCompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      //编辑状态设置
      edit:false,
      name:'',
      location:'',
      website:'',
      note:'',
      
    };
    
    // i18n
    this.text = ModifyCompanyReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    if (this.props.id) {
      this.setState({
        backend: await getAsync(`/companies/${this.props.id}`, true)
      });
    } else {
      this.setState({
        backend: await getAsync('/companies/1', true)
      });
    }
  }
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend && this.state.backend.status && (this.status.code.toString().startsWith('2'))) ? (
      <div className={classes.background}>
        <div className={`${classes.top} cell-wall d-flex align-items-end`}>
          <Breadcrumb

            itemList={[
              {
                name: '搜索公司',
                subPath: '/search-company'
              },
              {
                name: '修改公司',
                subPath: '/modify-company'
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
                    <div className={classes.companycard}>
                      <div>
                        <img
                          src={logo}
                          style={{
                            width:'5.7vw',
                            height:'auto',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft:'2.25vw',
                          width:'47.25vw'
                        }}>
                        <div>
                          <p
                            style={{
                              fontFamily: 'PingFang SC',
                              lineHeight: 'normal',
                              fontSize: '1.875vw',
                              fontWeight:'bolder',
                              color: '#454F69',
                              marginBottom:'0.39vw'
                            }}
                          >
                            {this.state.backend.content.name}
                          </p>
                          <p
                            style={{
                              fontFamily: 'PingFang SC',
                              lineHeight: 'normal',
                              fontSize: '0.875rem',
                              color: '#8D9AAF',
                              marginBottom:'0.39vw'
                            }}
                          > {this.state.backend.content.location} 
                          </p>
                          <p
                            style={{
                              fontFamily: 'PingFang SC',
                              lineHeight: 'normal',
                              fontSize: '1rem',
                              color: '#454F69',
                              margin:'0'

                            }}
                          >
                            <a href={this.state.backend.content.website}>{this.state.backend.content.website}</a>
                          </p>
                        </div>

                      </div>


                    </div>

                    <div className={classes.content}>

                      <div className={classes.name}>
                        概况
                      </div>



                      <br/>
                      <pre className={classes.note}>
                        {this.state.backend.content.note}
                      </pre>
                      <br/>
                      <p>
                        <span className={classes.titlebolder}> 所属行业</span>
                        <span className={classes.title}> 所属行业</span>
                      </p>
                      <br/>
                      <p>
                        <span className={classes.titlebolder}> 公司规模</span>
                        <span className={classes.title}> 公司规模</span>
                      </p>
                      <br/>
                      <p>
                        <span className={classes.titlebolder}> 公司类型</span>
                        <span className={classes.title}> 公司类型</span>
                      </p>
                      <br/>
                      <p>
                        <span className={classes.titlebolder}> 创立时间</span>
                        <span className={classes.title}> 创立时间</span>
                      </p>
                    </div>

                    <div className={classes.content}>
                      <div className="d-flex justify-content-between">
                        <div className={classes.name}>在招职位</div>
                        <div
                          style={{
                            justifyContent:'flex-end',
                            alignSelf:'flex-start',
                            color: '#8D9AAF',
                          }}
                        >
                          <MDBIcon far icon="edit" />
                        </div>
                      </div>

                      <br/>
                      <p className="h1 red-text">该公司在招职位API没有</p>
                    </div>
                    <CompanyPic edit={this.state.edit}/>
                  </div>
                ):(
                  <div>
                    <div className={classes.companycard}>
                      <div>
                        <img
                          src={logo}
                          style={{
                            width:'5.7vw',
                            height:'auto',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft:'2.25vw',
                          width:'47.25vw'
                        }}>
                        <div>
                          <textarea
                            style={{
                              fontFamily: 'PingFang SC',
                              lineHeight: 'normal',
                              fontSize: '1.875vw',
                              fontWeight:'bolder',
                              color: '#454F69',
                              marginBottom:'0.39vw'
                            }}
                            value={this.state.name}
                            className="form-control mr-2"
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                name:e.target.value
                              });
                            }}
                          />
                            
                          <textarea
                            style={{
                              fontFamily: 'PingFang SC',
                              lineHeight: 'normal',
                              fontSize: '0.875rem',
                              color: '#8D9AAF',
                              marginBottom:'0.39vw'
                            }}
                            value={this.state.location}
                            className="form-control mr-2"
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                location:e.target.value
                              });
                            }}
                          />
                         
                          <textarea
                            style={{
                              fontFamily: 'PingFang SC',
                              lineHeight: 'normal',
                              fontSize: '1rem',
                              color: '#454F69',
                              margin:'0'
                            }}
                            value={this.state.website}
                            className="form-control mr-2"
                            rows="1"
                            onChange={(e)=>{
                              this.setState({
                                website:e.target.value
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



                      <br/>
                      <textarea
                        style={{fontSize:'1.09vw'}}
                        value={this.state.note}
                        className="form-control mr-2"
                        rows="9"
                        onChange={(e)=>{
                          this.setState({
                            note:e.target.value
                          });
                        }}
                      />
                     
                      <br/>
                      <p>
                        <span className={classes.titlebolder}> 所属行业</span>
                        <span className={classes.title}> 所属行业</span>
                      </p>
                      <br/>
                      <p>
                        <span className={classes.titlebolder}> 公司规模</span>
                        <span className={classes.title}> 公司规模</span>
                      </p>
                      <br/>
                      <p>
                        <span className={classes.titlebolder}> 公司类型</span>
                        <span className={classes.title}> 公司类型</span>
                      </p>
                      <br/>
                      <p>
                        <span className={classes.titlebolder}> 创立时间</span>
                        <span className={classes.title}> 创立时间</span>
                      </p>
                    </div>

                    <div className={classes.content}>
                      <div className="d-flex justify-content-between">
                        <div className={classes.name}>在招职位</div>
                        <div
                          style={{
                            justifyContent:'flex-end',
                            alignSelf:'flex-start',
                            color: '#8D9AAF',
                          }}
                        >
                          <MDBIcon far icon="edit" />
                        </div>
                      </div>

                      <br/>
                      <p className="h1 red-text">该公司在招职位API没有</p>
                    </div>
                    <CompanyPic edit={this.state.edit}/>
                  </div>
                )}
                
              </div>
              <div >
                <div
                  onClick={()=>{
                    this.setState({
                      edit:true,
                      name:this.state.backend.content.name,
                      location:this.state.backend.content.location,
                      website:this.state.backend.content.website,
                      note:this.state.backend.content.note,
                      
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
                          id: this.state.backend.content.id,
                          name: this.state.name,
                          avatarUrl: this.state.backend.content.avatarUrl,
                          location: this.state.location,
                          website: this.state.website,
                          note: this.state.note,
                          nation: this.state.backend.content.nation,
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
                  <MDBIcon icon="pencil-alt" className="mr-2"/>
                  保存修改
                </MDBBtn>
                <MDBBtn className="py-2 ml-5 mt-3 blue lighten-1" color="info" style={{width:'11.71vw'}}>
                  <MDBIcon icon="pencil-alt" className="mr-2"/>
                  发布职位
                </MDBBtn>
                <MDBBtn 
                  className="py-2 ml-5 mt-3 blue lighten-1" 
                  color="info" 
                  style={{width:'11.71vw'}}
                  onClick={() => {
                    this.props.history.push('/create-company');
                  }}
                >
                  <MDBIcon icon="pencil-alt" className="mr-2"/>
                  新建公司
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    ):null;
   
  }
}

ModifyCompanyReact.i18n = [
  {},
  {}
];

ModifyCompanyReact.propTypes = {
  // self

  // React Router
  
  
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
  // React Redux
  
};

export const ModifyCompany = (ModifyCompanyReact);
