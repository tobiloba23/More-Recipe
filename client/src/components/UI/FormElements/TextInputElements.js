import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import classes from './TextInputElements.css';

const textInputElements = (props) => {
  let form = props.formElementsArray.map(formElement => {
    let inputClasses = [];
    if (!(formElement.config.validation && formElement.config.validation.valid) && formElement.config.validation && formElement.config.touched) {
      inputClasses.push(classes.Invalid);
    };

    return (
      <Aux>
        <div className="md-form">
          <i className={`${formElement.config.symbol} prefix grey-text`}></i>
          <input
            key={formElement.id}
            id={formElement.id}
            elementType={formElement.config.elementType}
            type={formElement.config.elementConfig.type}
            placeholder={formElement.config.elementConfig.placeholder}
            value={formElement.config.value}
            invalid={!(formElement.config.validation && formElement.config.validation.valid)}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={(event) => props.inputChanged(event, formElement.id)}
            className={`form-control white-text ${inputClasses}`}
          />
        </div>
        {formElement.id === 'password' ? <label onClick={() => props.showPassword('password')} >
            Show Password: <input type="checkbox"/>
          </label>
          : null
        }
      </Aux>
    )
  });

  return form;
};

export default textInputElements;
