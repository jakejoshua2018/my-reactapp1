import React from 'react';
import { Form } from 'react-bootstrap';


const Input = (props: any) => {

  let inputElement = null;

  switch ( props.config.elementType ) {

    case ( 'input' ) :
      if ( props.config.elementConfig.type === 'radio') {
        inputElement = props.config.elementConfig.options.map((item: any) => (
            <Form.Check
              key={item.value} 
              type={props.config.elementConfig.type} 
              label={item.text}
              value={item.value}
              name={props.name}
              onChange={ (event :any) => props.onChange(event,props.name) }   
          />
        ));
      } else {
          inputElement = (
              <Form.Control
                  as={props.config.elementType} 
                  type={props.config.elementConfig.type} 
                  placeholder={props.config.elementConfig.placeholder}
                  value={props.config.value}
                  isInvalid={!props.config.valid  && props.config.touched}
                  onChange={ (event :any) => props.onChange(event,props.name) }   
              />
          );
      }
      break;
    case ( 'textarea' ) :
      inputElement = (
        <Form.Control
            as={props.config.elementType} 
            type={props.config.elementConfig.type} 
            rows={props.config.elementConfig.rows}
            placeholder={props.config.elementConfig.placeholder}
            value={props.config.value}
            isInvalid={!props.config.valid && props.config.touched}
            onChange={ (event :any) => props.onChange(event,props.name) }   
        />
      );
      break;
    case ( 'select' ) :
      let optionsJSX  = props.config.elementConfig.options.map((item: any) => ( 
          <option key={item.value} value={item.value}> {item.text} </option>
      ));
      
      inputElement = (
        <Form.Control
            as={props.config.elementType} 
            type={props.config.elementConfig.type} 
            value={props.config.elementConfig.multiple ? props.config.selectedValues : props.config.value}
            isInvalid={!props.config.valid && props.config.touched}
            onChange={ (event :any) => props.onChange(event,props.name) }
            multiple={props.config.elementConfig.multiple}
        >
          {optionsJSX}
        </Form.Control>
      );
    break;
    default :
      inputElement = <input />;

  }

  return (
      <Form.Group>
          <Form.Label>{props.config.elementConfig.label}</Form.Label>
          {inputElement}
          <Form.Text muted>{props.config.elementConfig.help}</Form.Text>
          <Form.Control.Feedback type="invalid">{props.config.elementConfig.warning}</Form.Control.Feedback>
      </Form.Group>
  );
}

export default Input;
