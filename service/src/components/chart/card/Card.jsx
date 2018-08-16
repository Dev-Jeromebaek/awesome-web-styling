import React, { Component } from 'react';

import DropDown from '../dropdown/Dropdown';

export class Card extends Component {
  handleRefresh = () => {
    const { onRefresh } = this.props;
    onRefresh();
  };
  render() {
    const { setCycle } = this.props;
    return (
      <div className={'card' + (this.props.plain ? ' card-plain' : '')}>
        <div
          className={'header' + (this.props.hCenter ? ' text-center' : '')}
        >
          <h5
            className="title state d-flex justify-content-between align-items-center"
            style={{ fontSize: '0.9rem' }}
          >
            {this.props.title}
            <div className="d-flex align-items-center">
              <DropDown
                setCycle={setCycle}
                cycleTitle={this.props.cycleTitle}
              />
              <i
                className={this.props.statsIcon}
                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                onMouseDown={e => {
                  e.stopPropagation();
                }}
                onClick={this.handleRefresh}
              />
            </div>
          </h5>
          <p className="category">{this.props.category}</p>
        </div>
        <div className="content">
          {this.props.content}

          <div className="footer">
            <div className="legend" style={{ fontSize: '0.8rem' }}>
              {this.props.legend}
            </div>
            <hr />
            <div className="stats">
              <i className={this.props.statsIcon} />&nbsp; Updated{' '}
              {this.props.minutes} minutes ago
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
