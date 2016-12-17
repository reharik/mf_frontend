import React from 'react';
import InputColor from 'react-input-color';
import TokenAutocomplete from '../reactSelect/index';
import Datepicker from 'react-datepicker';
import moment from 'moment';
import classNames from 'classnames'

const InputFor = ({data,
                selectOptions}) => {

  let inputStyle = classNames({
    ['editor__container__' + (data.type ? data.type : 'input')]: true,
    'editor__success': !data.invalid,
    'editor__error': data.invalid
  });

  const input = function () {
    switch (data['x-input'] || data.type) {
      case 'date-time':
      {
        const onChange = moment => data.onChange({target: {name: data.name, value: moment}});
        return (<Datepicker selected={data.value || new moment()}
          {...data}
                            onChange={onChange}
                            onBlur={data.onBlur}
                            className={inputStyle}/>)
      }
      case 'color-picker':
      {
        const onChange = color => data.onChange({target: {name: data.name, value: color}});
        data.value = data.value || "#345678";
        return (<InputColor {...data} defaultValue={data.value} onChange={onChange}/>)
      }
      case 'select':
      {
        return (<TokenAutocomplete className={inputStyle} simulateSelect={true}
                                   parseToken={ value => value.label || value }
                                   parseOption={ value => value.label || value }
                                   options={selectOptions} {...data}
                                   defaultValues={data.value || []}
                                   filterOptions={false}
          {...data} />)
      }
      case 'multi-select':
      {
        return (<TokenAutocomplete className={inputStyle}
                                   defaultValues={data.value || []}
                                   parseToken={ value => value.label }
                                   parseOption={ value => value.label }
                                   parseCustom={ value => value.label }
                                   options={selectOptions} {...data}  />);
      }
      default:
      case 'number':
      case 'password':
      case 'string':
      {
        const password = data['x-input'] === 'password' ? {type: "password"} : '';
        return (<input className={inputStyle}
          {...password}
                       placeholder={data.placeholder}
                       name={data.name}
                       value={data.value}
                       onChange={data.onChange}
        />)
      }
    }
  };

  return (
    <div className="editor_input" > 
      { input() }
    </div>)
};

export default InputFor;



