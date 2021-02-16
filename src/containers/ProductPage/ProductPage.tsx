/**
 * File: ServicesPage.tsx
 * -----
 * Created Date: Thursday February 11th 2021
 * Author: Jerin George
 * -----
 * Last Modified: Tue Feb 16 2021
 * Modified By: Jerin George
 * @packageDocumentation
 */

import React, { Component, Fragment } from 'react';
import { produce } from 'immer';

import axios from '../../axios';
import classes from './ProductPage.module.css';
import Form from '../../components/UI/Form/Form';
import Table from '../../components/UI/Table/Table';
import checkValidity from '../../components/Shared/formValidation';

class ProductPage extends Component {

  initialFormState: any = null;
  tableData: any = null;

  state = {
    commentForm: {
  
      selectMaster: {
        elementType: 'select',
        elementConfig: { 
          type: null,
          label: 'Masters:',
          options: [
            {text: "---Select table---",value: "0"},
            {text: "Main Category",value: "/maincategory"},
            {text: "Category", value: "/category"},
            {text: "SubCategory",value: "/subcategory"},
            {text: "Product Sevices",value: "/productsservices"}
          ],
          multiple: false,
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
    formIsValid: false,
    error: false,
    dataRecieved: false,
    emptyTable: false, 
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

    axios.get(customerForm.selectMaster.value)
         .then( response => {
                // let  updateBlogs: any = produce( this.state.blogs, (model: any) => {
                //     model.push(response.data);
                // } );
                // this.setState( {blogs: updateBlogs, error: false} );

            
            this.tableData = response.data;
            console.log('Data Got Successfully:', this.tableData.length);
            if (this.tableData.length === 0) this.state.emptyTable=true;;
            this.setState( {error: false, dataRecieved: true} );
          })
          .catch(  error => {
            console.log('PRoductPage submitHandler Error :',error);
            this.setState( {error: true, dataRecieved: false} );
          });

    //Re-initialize Form
    //this.setState( {commentForm: this.initialFormState} );
  }

  render=( ) => {

    //console.log("Product Page render()", this.state);

    //---------------------------Form Elements----------------------------//
    let formJSX = (
      <Form 
        formConfig={this.state.commentForm} 
        onChange={this.inputChangeHandler}
        onSubmit={this.submitHandler}
        formIsValid={this.state.formIsValid}
      />
    );


    //---------------------------Table Elements----------------------------//
    let selection: any = this.state.commentForm.selectMaster;

    let captionText: any;
    for (let [key, values] of Object.entries(selection.elementConfig.options)) {
      
      let { text, value }: any = values;
      
      if ( value === selection.value) {
        captionText = text;
      }
    }

    let className: any = "w3-table w3-responsive w3-striped w3-border w3-pale-green w3-centered w3-hoverable w3-card-4 w3-animate-top"; 
    
    
    if( this.state.emptyTable ) {

      className = "w3-table  w3-striped w3-border w3-pale-green w3-centered w3-hoverable w3-card-4 w3-animate-top";
      this.state.emptyTable = false;
    } 

    let tableJSX = (
      <Table
      className = {className}
      tableContent = {this.tableData}
      tableCaption = {captionText}
      rowSelect = {'radio'}
      filterList = { [
        { element:'id', 
          type: 4, 
          options: [0,1,2,3,4], 
          //defaultOption:2,
          //defaultComparator: 'NE' 
        },
        {element:'name', type: 0},
        {element:'description', type: 0},
        {element:'onTop', type: 1, options:  {
          true: 'true',
          false: 'false'
          },
          //defaultOption: true
        },
        // {element:'onTop', type: 2, options:  {
        //   true: 'true',
        //   false: 'false'
        //   },
        //   defaultOption: [ true, false]
        // }
      ] }
      />
    );


    //---------Render Form and Table Elements, If table data recieved--------------//
    if (this.state.dataRecieved) {

      //console.log('Table Data:',this.tableData);
      this.state.dataRecieved=false;

      return (
      
      <Fragment>
        <div className="w3-container w3-mobile w3-pink">
          <h3>Products</h3>
        </div>
        <div className={"w3-container w3-mobile w3-responsive w3-center w3-light-grey"}>
        
          <br /><br /> 
          <div className={classes.Form}>
            { formJSX }
          </div>  
          <br />
          <br />
         
          {tableJSX }
        </div>
               
      </Fragment>   
      );

    }

    //---------Render Form Element only, If table data not recieved--------------//
    return (

      
      <Fragment >
        <div className="w3-container w3-mobile w3-pink">
          <h3>Products</h3>
        </div>
        <div className={"w3-container w3-mobile w3-responsive w3-center w3-light-grey"}>
         
          <br /><br /> 
            <div className={classes.Form}>
              { formJSX }
            </div>

          <br /><br /><br />
          <br /><br /><br /> 
          <br /><br /><br />
          <br /><br /><br /> 
          <br /><br /> 
        </div> 
      </Fragment>   
      );
    
  }
  
  componentDidMount= ( ) =>  {
    //console.log('Product Page componentDidMount :',this.state);
    //this.initialFormState=produce( this.state.commentForm, (model: any) => {});
  }

  componentDidUpdate= ( ) => {
   //console.log('Product Page componentDidUpdate :',this.state);

   
  }

}

export default ProductPage;
