import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import UpdateTrainerForm from '../../components/forms/UpdateTrainerForm';
import formJsonSchema from '../../utilities/formJsonSchema';
import states from './../../constants/states'
import { updateTrainerInfo,
  updateTrainerContact,
  updateTrainerAddress,
  updateTrainerPassword,
  updateTrainersClients,
  fetchTrainerAction } from './../../modules/trainerModule';
import { fetchClientsAction } from './../../modules/clientModule';
import {actions as notifActions} from 'redux-notifications';
const {notifClear} = notifActions;


const mapStateToProps = (state, ownProps) => {
  const trainer = state.trainers.filter(x=>x.id === ownProps.params.trainerId)[0];
  const clients = state.clients.map(x=> ({ value:x.id , display: `${x.contact.lastName} ${x.contact.firstName}` }));
  const model = formJsonSchema(state.schema.definitions.trainer, trainer);

  return {
    model,
    states,
    clients
  }
};

export default connect(mapStateToProps, { updateTrainerInfo,
  updateTrainerContact,
  updateTrainerAddress,
  updateTrainerPassword,
  updateTrainersClients,
  fetchTrainerAction,
  fetchClientsAction,
  notifClear})(UpdateTrainerForm);
