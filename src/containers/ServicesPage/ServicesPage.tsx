import React, { Component, Fragment } from 'react';
import { produce } from 'immer';

import axios from '../../axios-services';
import classes from './ServicePage.module.css';
import Form from '../../components/UI/Form/Form';
import Table from '../../components/UI/Table/Table';
import checkValidity from '../../components/Shared/formValidation';


class ServicePage extends Component {

  initialFormState: any = null;
  state = {
    commentForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Customer Name :',
          placeholder:'Enter Customer Name',
          warning: 'Customer Name must be filled out with valid characters',
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
      address: {
        elementType: 'textarea',
        elementConfig: { 
          type: null,
          rows: '3',
          label: 'Address :',
          placeholder:'Enter your Address',
          warning: 'Must be Min: 10 and Max: 50 characters long',
          help: 'Not more than 50 words'
        },
        validation: {
          required: true,
          minLength: 10,
          maxLength:50
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
      }   
    },
    formIsValid: false,
    error: false 
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
    var customerForm = this.state.commentForm;
    axios.post('/customers', { customerName: customerForm.name.value, customerAddress: customerForm.address.value, customerPhoneNo: customerForm.phoneno.value, customerEmail: customerForm.email.value})
         .then( response => {
                // let  updateBlogs: any = produce( this.state.blogs, (model: any) => {
                //     model.push(response.data);
                // } );
                // this.setState( {blogs: updateBlogs, error: false} );
            console.log('Registered Successfully:',response);
            this.setState( {error: false} );
          })
          .catch(  error => {
            console.log('ServicePage submitHandler Error :',error);
            this.setState( {error: true} );
          });

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

    let tableJSX = (
      <Table
        tableLength = '6'
      />
    );

    return (
        <Fragment>
          <h3>Customer Registartion</h3>
          <br />
          <br />
          <div className={classes.Form}>
            { formJSX }
            <br />
            <br />
            { tableJSX }
          </div>       
        </Fragment>   
    );
  }
  
  componentDidMount( ) {
    //console.log('componentDidMount :',this.state);
    this.initialFormState=produce( this.state.commentForm, (model: any) => {});
 
  }

  componentDidUpdate( ) {
   //console.log('componentDidUpdate :',this.state);
  }

}

export default ServicePage;
