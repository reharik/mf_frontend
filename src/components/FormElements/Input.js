//"use strict";

import React from 'react';
import propToLabel from './../../utilities/propToLabel';
// import { actions as notifActions } from 'redux-notifications';
// const { notifSend } = notifActions;

const _Input = ({property, type, label, placeholder, validation, dispatch}) => {

  let _label = propToLabel(label || property.name);
  let _placeholder = propToLabel(placeholder || _label);
  let validationState = property.touched ? property.invalid ? {validationState: 'input__error'} : {validationState: 'input__success'} : null;
  let style = 'input__container__' + (type ? type : 'input');
  let val = property.touched && property.error ? property.error : ' ';
  let valStyle = property.touched && property.error
    ? 'input__container__validation__error'
    : 'input__container__validation__success';
// var valy;
//   switch (validation) {
//     case "inline": {
//       valy = (<div className={valStyle}>{val}</div>);
//       break;
//     }
//     case 'top': {
//       // dispatch(notifSend({
//       //   message: 'hello world',
//       //   kind: 'info',
//       //   dismissAfter: 2000
//       // }));
//     }
//
//   }


  return (<div className="input__container" {...validationState}>
    <label className="input__container__label" htmlFor={property.name}>{_label}</label>
    <input className={style} type={type ? type : 'text'} placeholder={_placeholder} {...property} />
  </div>);
};

export default _Input;
