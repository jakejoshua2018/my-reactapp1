
import React from 'react';
import * as BootstrapForm from 'react-bootstrap';

import Input from '../Input/Input';


const Form = (props: any) => {

  let formElementArray: any[] = [];
  
  for (let [key, value] of Object.entries(props.formConfig) ) {
      formElementArray.push( {name: key, config: value} );
  }

  // { name: 'comment', config: { } }

  let controlsJSX = formElementArray.map( ( item: any ) => {

    return ( 
      <Input 
        key={item.name}
        name={item.name}
        config={item.config}
        onChange={(event :any) => props.onChange(event, item.name)}
      />
    );

  });

  return (
    <BootstrapForm.Form onSubmit={props.onSubmit}>
        { controlsJSX }
        <BootstrapForm.Button variant="primary" type="submit" disabled={!props.formIsValid}>Submit</BootstrapForm.Button>         
    </BootstrapForm.Form>
  );
}

export default Form;
