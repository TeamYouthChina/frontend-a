import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import bag from './bag.svg';
import calender from './calender.svg';
import classes from './index.module.css';
//import detail from './detail.svg';
import jobIcon from './jobIcon.svg';
import {languageHelper} from '../../../tool/language-helper';
import location from './location.svg';
import {getAsync} from '../../../tool/api-helper';
import {Location} from '../location';
import dateFormat from 'dateformat';

class JobCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:'',
      starttime:'',
      deadline:'',
    };
    // i18n
    this.text = JobCardReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (this.props.id) {
      let backend= await getAsync(`/jobs/${this.props.id}`);
      this.setState({
        backend: backend,
        starttime:new Date(backend.content.start_time),
        deadline:new Date(backend.content.dead_line),

      });
    }
  }

  clickOnCard = () => {};

  render() {
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
      <div
        className={classes.Card}
        onClick={() => {
          this.props.history.push(`/job/${this.state.backend.content.id}`);
        }}
      >
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Img}>
            {/* <img src={this.state.backend.content.organization.avatarUrl} alt="no img" /> */}
            <img src={jobIcon} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Title}>
              <p className={classes.P1}>{this.state.backend.content.name}</p>
            </div>
            <div className={classes.Des1}>
              <p className={classes.P1}>{this.state.backend.content.organization.name}</p>
            </div>
            <div className={classes.Des2}>
              <div className={classes.Row}>
                <div className={classes.Column}>
                  <img src={location} alt="no img" />
                  <Location
                    code={this.state.backend.content.location[0]}
                    edit={false}
                    locate={()=>{}}
                  />
                </div>
                <div className={classes.Column}>
                  <img src={calender} alt="no img" />
                  <p>
                    3-5 {this.text.geYue}{' '}
                  </p>
                </div>
              </div>
              <div className={classes.Row}>
                <div className={classes.Column}>
                  <img src={calender} alt="no img" />
                  <p>
                    {this.text.kaiFangShenQing}{' '}

                    {dateFormat(this.state.starttime,'yyyy-mm-dd')}
                  </p>
                </div>
                <div className={classes.Column}>
                  <img src={bag} alt="no img" />
                  <p>
                    {this.text.shenQingJieZhi}{' '}
                    {dateFormat(this.state.deadline,'yyyy-mm-dd')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ):null;
  }
}

JobCardReact.i18n = [
  {
    geYue: '个月',
    shenQingJieZhi: '申请截止',
    kaiFangShenQing:'开放申请',
    shouCang: '收藏',
  },
  {
    geYue: 'months',
    shenQingJieZhi: 'Applicaiton Deadline',
    kaiFangShenQing:'Application Start',
    shouCang: 'Like',
  },
];

JobCardReact.propTypes = {
  // self
  id: PropTypes.number.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const JobCard = withRouter(JobCardReact);
