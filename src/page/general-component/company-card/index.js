import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

//import arrow from './arrow.svg';
import classes from './index.module.css';

//import bag from './bag.svg';

import employee from './employee.svg';

import location from './location.svg';
import {Location} from '../location';
import { languageHelper } from '../../../tool/language-helper';
import {getAsync} from '../../../tool/api-helper';


class CompanyCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {

    };
    // i18n
    this.text = CompanyCardReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (this.props.id) {
      this.setState({
        backend: await getAsync(`/companies/${this.props.id}`)
      });
    } else {
      this.setState({
        backend: await getAsync('/companies/1')
      });
    }
  }

  clickOnCard = () => {};

  clickPositions = () => {};



  render() {
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
      <div
        className={classes.Card}
        onClick={() => {
          this.props.history.push(`/company/${this.state.backend.content.id}`);
        }}
      >
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Icon}>
            <img src={(this.state.backend.content.avatarUrl)?(this.state.backend.content.avatarUrl):('https://frontendpic.oss-us-east-1.aliyuncs.com/%E5%85%AC%E5%8F%B8.png')} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Name}>
              <p>{this.state.backend.content.name}</p>
            </div>
            <div className={classes.Des2}>
              <img src={location} alt="no img" className="img-fluid"/>
              <Location
                code={this.state.backend.location}
                edit={false}
                locate={()=>{}}
              />
            </div>
            <div className={classes.Des2}>
              <img src={employee} alt="no img" />
              <a href={this.state.backend.content.website}>
                {this.state.backend.content.website}
              </a>
            </div>
          </div>
          {/*<div className={classes.Actions}>*/}
          {/*<div className={classes.Positions} onClick={this.clickPositions}>*/}
          {/*<button>*/}
          {/*<img src={bag} alt="no img" />*/}
          {/*<p>*/}
          {/*{this.text.currently} {this.state.backend.content.jobCount}{this.text.openPos}*/}
          {/*</p>*/}
          {/*<img src={arrow} alt="no img" />*/}
          {/*</button>*/}
          {/*</div>*/}
          {/**/}
          {/*</div>*/}
        </div>
      </div>
    ):null;
  }
}

CompanyCardReact.i18n = [
  {
    unLike: '取消收藏',
    currently: '目前',
    openPos: '个空缺职位',
    employee: '个职位',
  },
  {
    unLike: 'UnLike',
    currently: 'Currently',
    openPos: 'Open Position',
    employee: 'employees',
  },
];

CompanyCardReact.propTypes = {
  // self
  id: PropTypes.number.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CompanyCard = withRouter(CompanyCardReact);
