import React from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Breadcrumb} from '../general-component/breadcrumb';
import {Location} from '../general-component/location';
import classes from './index.module.css';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {getAsync,post} from '../../tool/api-helper';
import logo from './logo.png';

import { Select } from 'antd';
import {TagModal} from './tag-component/tagModal';

class CreateCompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      name: '',
      avatarUrl: '',
      location: '110000',
      website: '',
      note: '',
      value:'搜索我的标签',
      select:[],
      select_code:[],
    };
    // i18n
    this.text = CreateCompanyReact.i18n[languageHelper()];
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
      avatarUrl: this.state.avatarUrl,
      id: 0,
      location: {
        location_code: this.location.code,
        nation_code: this.location.countryCode
      },
      name: this.state.name,
      nation: this.location.countryCode,
      note: this.state.note,
      website: this.state.website
    };
    post('/companies', backendPost).then((data) => {
      if (data.status.code.toString().startsWith('2')) {
        this.setState({
          select_code:this.select_code,
          modal1:false
        });
        for (let i=0;i<this.select_code.length;i+=1){
          post(
            '/labels',
            {label_code:this.select_code[i],target_id:parseInt(`${data.content.id}`),target_type:200}
          );
        }
        alert('新增成功。');
        
        this.props.history.push(`/company/${data.content.id}`);
      } else {
        throw data;
      }
    });
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
                    name: '搜索公司',
                    subPath: '/search/company'
                  },
                  {
                    name: '新建公司',
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
                      <div className="mb-3">
                        <div className={classes.content}>
                          <div className={classes.name}>
                            标签
                          </div>
                          <br />
                          <Select
                            tags
                            showSearch
                            allowClear={true}
                            style={{ width: '100%' }}
                            searchPlaceholder="标签模式"
                            value={this.state.value}
                            onChange={this.handleChange}
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

CreateCompanyReact.i18n = [
  {},
  {}
];

CreateCompanyReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CreateCompany = (CreateCompanyReact);
