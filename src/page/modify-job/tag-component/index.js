import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {MDBIcon,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import { Select } from 'antd';
import {Tag} from './tag';
import {TagModal} from './tagModal';
import {post} from '../../../tool/api-helper';
import {languageHelper} from '../../../tool/language-helper';
import {getAsync, isLogin} from '../../../tool/api-helper';

class AdvantageTagReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      modal1:false,
      modal2:false,
      backend:null,
      render:0,
      value:'搜索我的标签',
      select:[],
      select_code:[],
      finishtag:false,
    };
    // i18n
   
    this.text = AdvantageTagReact.i18n[languageHelper()];
    this.select=[];
    this.select_code=[];
    this.dic=[];
    
    // style
  }
  async componentDidMount(){
    if(!isLogin()){
      this.props.history.push('/login');
    }
    // const Option = Select.Option;
    // let tag=await getAsync(`/static/dictionaries?type=label`)
    // let children = [];
    // tag.content.map((item,index)=>{
    //   children.push(<Option key={item.name} value={item.name}>{item.name}</Option>);
    // });
    let tag=await getAsync('/static/dictionaries?type=label');
    tag.content.map((item)=> {
      this.dic.push(item.name);
    });
    this.setState({
      render:1,
      backend:await getAsync(`/labels/${this.props.type}/${this.props.id}`),
      tag:tag,
      //children:children
    });
    

  }
  toggle = nr => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
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
  
  onFresh = async () => {
    this.setState({
      backend:await getAsync(`/labels/${this.props.type}/${this.props.id}`),
    });
   
  };
  
  render() {
    switch (this.state.render) {
      case 1:
        //console.log(this.props.id);
        return (
          <div>
            <div className={classes.content}>
              <p className={classes.name}>
                求职标签
              </p>
              {
                this.state.backend.content.length===0?(
                  <div>
                    <div
                      className={classes.type1}
                      style={{width:'10vw'}}
                      onClick={()=>{
                        this.setState({
                          modal1:true
                        });
                      }}
                    >
                      <MDBIcon icon="plus" />
                    </div>
                    <div className={classes.notag}>
                      添加公司标签
                    </div>
                  </div>

                ):(
                  <div className="d-flex justify-content-start">
                    <div 
                      className={classes.type1}
                      //onClick={this.toggle(1)}
                      onClick={()=>{
                        if (this.state.backend.content.length===1){
                          this.setState({
                            modal2:true
                          });
                        }
                        else if(this.state.backend.content.length<1){
                          this.select=[];
                          this.setState({
                            select:this.select,
                            modal1:true
                          });
                        }

                      }}
                    >
                      <MDBIcon icon="plus" />
                    </div>
                    {this.state.backend.content.map((item,index)=>{
                      return(
                        <div className="d-flex justify-content-start" key={index}>
                          <Tag
                            fresh={this.onFresh}
                            id={item.label_id}
                            tag={item.label_chn}
                            label_code={item.label_code}
                            length={this.state.backend.content.length}
                          />
                        </div>
                      );
                    })}
                  </div>
                )
              }

            </div>
            <MDBModal isOpen={this.state.modal1}  size="lg" centered>
              <MDBModalHeader >添加标签</MDBModalHeader>
              <MDBModalBody>
                {/*<div className="mb-3">*/}
                {/*<MDBInput hint="搜索我的标签" type="text" containerClass="mt-0 mx-2" />*/}
                {/*</div>*/}
                <div className="mb-3">
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

                    {/*{this.state.children}*/}
                  </Select>
                </div>
                <div className="d-flex flex-wrap justify-content-start">
                  {
                    this.state.select.map((item,index)=>{
                      return(
                        <TagModal key={index} tag={item}/>
                      );
                    })
                  }
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle(1)}>关闭</MDBBtn>
                <MDBBtn
                  color="primary"
                  onClick={()=>{
                    this.setState({
                      select_code:this.select_code,
                      modal1:false
                    });
                    for (let i=0;i<this.select_code.length;i+=1){
                      post(
                        '/labels',
                        {label_code:this.select_code[i],target_id:parseInt(`${this.props.id}`),target_type:200}
                      ).then(async ()=>{
                        this.setState({
                          backend:await getAsync(`/labels/${this.props.type}/${this.props.id}`),
                        });
                      }
                      );
                    }
                  }}
                >
                  保存
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="sm" centered>
              <MDBModalHeader toggle={this.toggle(2)}>提示</MDBModalHeader>
              <MDBModalBody>
                <h6>工作只能添加唯一标签</h6>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" size="sm" onClick={this.toggle(2)}>关闭</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </div>
        );
      default:
        return null;
    }
  }
}

AdvantageTagReact.i18n = [
  {},
  {}
];

AdvantageTagReact.propTypes = {
  // self
  type: PropTypes.number.isRequired,
  id:PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const AdvantageTag = withRouter(AdvantageTagReact);
