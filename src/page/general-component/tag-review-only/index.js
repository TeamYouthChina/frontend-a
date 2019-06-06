import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {TagModal} from './tagModal';
import {languageHelper} from '../../../tool/language-helper';
import {getAsync, isLogin} from '../../../tool/api-helper';

class TagReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      modal1:false,
      backend:null,
      render:0,
      value:'搜索我的标签',
      select:[],
      select_code:[],
      finishtag:false,
    };
    // i18n
   
    this.text = TagReviewReact.i18n[languageHelper()];
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
    
    // this.setState((prevState)=>({
    //   select: [...prevState.select,value],
    //   value: value,
    // }));


  }
  // submit= async (body)=>{
  //   await postAsync('/labels', body);
  //   // .then((data)=>{
  //   //   return(data);
  //   // });
  // }

  onFresh = async () => {
    this.setState({
      backend:await getAsync(`/labels/${this.props.type}/${this.props.id}`),
    });
  };
  
  render() {
    switch (this.state.render) {
      case 1:
        //console.log(this.state.backend.content);
        return (
          <div>
            <div className={classes.content}>
              <p className={classes.name}>
                标签
              </p>
              <div className="d-flex justify-content-start">
                {this.state.backend.content.map((item,index)=>{
                  return(
                    <div className="d-flex justify-content-start" key={index}>
                      <TagModal
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
            </div>
          </div>
        );
      default:
        return null;
    }
  }
}

TagReviewReact.i18n = [
  {},
  {}
];

TagReviewReact.propTypes = {
  // self
  type: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const TagReview = withRouter(TagReviewReact);
