import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import AppointmentModal from './AppointmentModal'
import {Calendar} from 'redux-task-calendar'
import AppointmentContainer from './../containers/forms/AppointmentContainer'
import moment from 'moment';

class MFCalendar extends Component {
  state = {
    isOpen: false
  };

  componentWillMount() {
    this.props.fetchClientsAction();
    this.props.fetchTrainersAction();

    this.config = {
      ...this.props.config,
      retrieveDataAction: this.props.retrieveDataAction,
      taskClickedEvent: this.taskClickedEvent,
      openSpaceClickedEvent:this.openSpaceClickedEvent }
  }

  taskClickedEvent = (id, task, calendarName) => {
    this.setState({
      isOpen: true,
      args: {apptId: id, task, calendarName}
    });
  };

  openSpaceClickedEvent = (day, time, calendarName) => {
    const formattedTime = moment(time,'h:mm A').format('hh:mm A');
    this.setState({
      isOpen: true,
      args: {day, startTime:formattedTime, calendarName}
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
      args: {}
    });
  };

  render() {
    return (
      <div id='mainCalendar'>
        <ContentHeader >
          <div className="mainCalendar__header">
            <div className="mainCalendar__header__left">
            </div>
            <div className="mainCalendar__header__center">
            </div>
            <div className="mainCalendar__header__right">
            </div>
          </div>
        </ContentHeader>
        <div className="form-scroll-inner">
          <div className="content-inner">
            <Calendar config={this.config}/>
          </div>
        </div>
        <AppointmentModal
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          form={<AppointmentContainer args={this.state.args} cancel={this.onClose} />}
          title={this.props.title} />
      </div>);
  };
}

MFCalendar.contextTypes = {
  config: React.PropTypes.object
};

export default MFCalendar;
