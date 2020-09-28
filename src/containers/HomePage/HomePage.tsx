import React, { Component, Fragment } from 'react';
import { produce } from 'immer';

import classes from './HomePage.module.css';
import Form from '../../components/UI/Form/Form';
import checkValidity from '../../components/Shared/formValidation';


class HomePage extends Component {

  initialFormState: any = null;
  state = {
    commentForm: {
      firstName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'First Name :',
          placeholder:'Enter First Name',
          warning: 'First Name must be filled out with valid characters',
          help: 'Acceptable only alphabets'
         },
        validation: {
          required: true,
          isLetters: true
        },
         value: '',
         valid: false,
         touched: false
      },
      gender: {
        elementType: 'input',
        elementConfig: { 
          type: 'radio',
          label: 'Gender :',
          options: [
            {text: "male",value: "0"},
            {text: "female",value: "1"}
          ],
          defaultValue: '0',
          warning: 'Enter gender',
          help:'Select gender'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false,
        touched: false
      },
      comment: {
        elementType: 'textarea',
        elementConfig: { 
          type: null,
          rows: '3',
          label: 'Comments :',
          placeholder:'Enter your comment',
          warning: 'Must be Min: 10 and Max: 250 characters long',
          help: 'Not more than 250 words'
        },
        validation: {
          required: true,
          minLength: 10,
          maxLength:250
        },
        value: '',
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          label: 'Email :',
          placeholder:'Enter your email',
          warning: 'Enter a valid email address',
          help:'We will never share your email with anyone else.'
        },
        validation: {
          required: true,
          isEmail: true
        },
         value: '',
         valid: false,
         touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: { 
          type: 'password',
          label: 'Password :',
          placeholder:'Enter your password',
          warning: 'Password combination invalid',
          help:'Password must be 6 character long'
        },
        validation: {
          required: true,
          minLength: 6
        },
        value: '',
        valid: false,
        touched: false
      },
      phoneno: {
        elementType: 'input',
        elementConfig: { 
          type: 'numeric',
          label: 'Phone No: :',
          placeholder:'Enter your phone no.',
          warning: 'Phone no. combination invalid',
          help: 'Phone no. must be 10 character long'
        },
        validation: {
          required: true,
          minLength: 10,
          maxLength: 10
        },
        value: '',
        valid: false,
        touched: false
      },
      country: {
        elementType: 'select',
        elementConfig: { 
          type: null,
          label: 'Country :',
          options: [
            {text: "---Select Country---",value: "0"},
            {text: "India",value: "1"},
            {text: "USA",value: "2"},
            {text: "UK",value: "3"}       
          ],
          multiple: false,
          warning: 'Must Select a Country'
        },
        validation: {
          selection: true
        },
        value: '',
        selectedValues: [ ],
        valid: false,
        touched: false
      },
      selectNumbers: {
        elementType: 'select',
        elementConfig: { 
          type: null,
          label: 'Select Numbers :',
          options: [
            {text: "---Select Options---",value: "0"},
            {text: "Option 1",value: "1"},
            {text: "Option 2", value: "2"},
            {text: "Option 3",value: "3"},
            {text: "Option 4",value: "4"},
            {text: "Option 5",value: "5"}
          ],
          multiple: true,
          warning: 'Must Select a Option'
        },
        validation: {
          selection: true
        },
        value:'',
        selectedValues: [ ] ,
        valid: false,
        touched: false
      }     
    },
    formIsValid: false 
  }


  inputChangeHandler = (event: any, controlName: string) => {

   //console.log(controlName, event.target.value);
    let updatedCommentForm: any = null;

    updatedCommentForm = produce( this.state.commentForm, (model: any) => {

      if (  model[controlName].elementType === 'select' &&  model[controlName].elementConfig.multiple ) {

          model[controlName].selectedValues=[ ];
          for ( let i: number=0; i < event.target.selectedOptions.length; i++ )  {
            model[controlName].selectedValues.push(event.target.selectedOptions[i].value);
          }
      } else {

        model[controlName].value = event.target.value;
      }
      model[controlName].touched = true;
      model[controlName].valid = checkValidity(event.target.value, model[controlName].validation);
    });

    //chek if all controls are valid
    let formValid = true;
    for(  let controlName in updatedCommentForm ) {
      formValid = updatedCommentForm[controlName].valid && formValid;
    }

    this.setState( {commentForm: updatedCommentForm, formIsValid: formValid} );  
  }

  submitHandler = (event: any) => {
    event.preventDefault( );
    console.log('submitHandler'); 

    //save to backend....

    //Re-initialize Form
    this.setState( {commentForm: this.initialFormState} );
  }

  render( ) {

    let formJSX = (
      <Form 
        formConfig={this.state.commentForm} 
        onChange={this.inputChangeHandler}
        onSubmit={this.submitHandler}
        formIsValid={this.state.formIsValid}
      />
    );

    return (
        <Fragment>
          <h1>Home Page</h1>
          <br />
          <br />
          <div className={classes.Form}>
            { formJSX}
          </div>
        </Fragment>   
    );
  }
  
  componentDidMount( ) {
    //console.log('componentDidMount :',this.state);
    this.initialFormState=produce( this.state.commentForm, (model: any) => {});
 
  }

  componentDidUpdate( ) {
   console.log('componentDidUpdate :',this.state);
  }

}

export default HomePage;
