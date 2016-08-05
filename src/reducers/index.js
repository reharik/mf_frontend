
import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form';
import { routerReducer as routing } from 'react-router-redux'
// import { Reducers } from 'react-redux-grid';
import { reducer as notifReducer } from 'redux-notifications';

import menu from './menuReducer';
import auth from './authReducer';

const routerReducer = combineReducers({
    // ...Reducers,
  notifReducer,
    menu,
    auth,
    routing,
    form//,
  // notifs
});

export default routerReducer;
