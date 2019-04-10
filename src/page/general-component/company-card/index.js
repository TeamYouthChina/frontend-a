import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import arrow from './arrow.svg';
import classes from './index.module.css';

import bag from './bag.svg';
import des1 from './des1.svg';
import employee from './employee.svg';
import icon from './amazon.svg';
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
          this.props.history.push(`/modify-company/${this.state.backend.content.id}`);
        }}
      >
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Icon}>
            {/* <img src={this.state.cardData.content.avatarUrl} alt="no img" /> */}
            <img src={icon} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Name}>
              <p>{this.state.backend.content.name}</p>
            </div>
            <div className={classes.Des1}>
              <img src={des1} alt="no img" />
              <p>
                e-commerce<span style={{ color: 'red' }}>api没有这个</span>
              </p>
            </div>
            <div className={classes.Des2}>
              <img src={employee} alt="no img" />
              <p>
                100{this.text.employee}
                <span style={{ color: 'red' }}>api没有这个</span>
              </p>
            </div>
          </div>
          <div className={classes.Actions}>
            <div className={classes.Positions} onClick={this.clickPositions}>
              <button>
                <img src={bag} alt="no img" />
                <p>
                  {this.text.currently + 100 + this.text.openPos}
                  <span style={{ color: 'red' }}>api没有这个</span>
                </p>
                <img src={arrow} alt="no img" />
              </button>
            </div>
            
          </div>
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
  id: PropTypes.string.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired,
};

export const CompanyCard = withRouter(CompanyCardReact);
