import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.css';
import {Link, withRouter} from 'react-router-dom';


import {languageHelper} from '../../../tool/language-helper';

export class BreadcrumbReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = BreadcrumbReact.i18n[languageHelper()];
    // style
    
  }

  render() {
    return (
      <div
        className="cell-wall"
      >
        <div
          className="cell-membrane"
        >
          <div
            className={classes.content}
          >
            <div>
              <Link 
                to={'/'} className={classes['interval-text']}>主页/</Link>
            </div>
            {
              this.props.itemList.map((item, index) => {
                return (
                  <div
                    className={this.props.location.pathname.indexOf(item.subPath) > -1 ? classes['interval-selected'] : classes.interval}
                    style={this.margin}
                    key={index}
                  >
                    <Link
                      className={this.props.location.pathname.indexOf(item.subPath) > -1 ? classes['interval-text-selected'] : classes['interval-text']}
                      onClick={() => {
                        this.props.history.push(item.subPath);
                      }}
                    >
                      {item.name}/
                    </Link>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

BreadcrumbReact.i18n = [
  {},
  {}
];

BreadcrumbReact.propTypes = {
  // self
  align: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  intervalVw: PropTypes.number.isRequired,
  itemList: PropTypes.array.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Breadcrumb = withRouter((BreadcrumbReact));
