import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import AppointmentModal from './AppointmentModal'
import {Calendar} from 'redux-task-calendar'
import AppointmentContainer from './../containers/forms/AppointmentContainer'
import UpdateAppointmentContainer from './../containers/forms/UpdateAppointmentContainer'
import moment from 'moment';

class MFCalendar extends Component {
  state = {
    isOpen: false,
    form: null
  };

  componentWillMount() {
    this.props.fetchClientsAction();
    this.props.fetchTrainersAction();

    this.config = {
      ...this.props.config,
      retrieveDataAction: this.props.retrieveDataAction,
      updateTaskViaDND: this.props.updateTaskViaDND,
      taskClickedEvent: this.taskClickedEvent,
      openSpaceClickedEvent:this.openSpaceClickedEvent }
  }

  updateAppointment = (args) => {
    return (<AppointmentModal

      isOpen={true}
      onClose={this.onClose}
      form={<UpdateAppointmentContainer args={args} cancel={this.onClose} />}
      title={this.props.title} />)
  };

  scheduleAppointment = (args) => (<AppointmentModal
    isOpen={true}
    onClose={this.onClose}
    form={<AppointmentContainer args={args} cancel={this.onClose} />}
    title={this.props.title} />);

  taskClickedEvent = (id, task, calendarName) => {
    this.setState({
      form: this.updateAppointment({apptId: id, task, calendarName})
    });
  };

  openSpaceClickedEvent = (day, time, calendarName) => {
    const formattedTime = moment(time,'h:mm A').format('hh:mm A');
    this.setState({
      isOpen: true,
      form: this.scheduleAppointment({day, startTime:formattedTime, calendarName})
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
      form: null
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
        {this.state.form}
      </div>);
  };
}

MFCalendar.contextTypes = {
  config: React.PropTypes.object
};

export default MFCalendar;
