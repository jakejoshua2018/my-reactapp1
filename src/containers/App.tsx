import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Layout from '../hoc/Layout/Layout';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/About';
import ServicesPage from './ServicesPage/ServicesPage';



class App extends Component {

  render( ) {

    return (
      <Layout>
        <Switch>
          <Route path='/about' component={AboutPage}/>
          <Route path='/services' component={ServicesPage}/>
          <Route path='/' exact component={HomePage}/>
          <Route render = { ( ) => <h3>Page Not Found! 404</h3>}/>
        </Switch>
      </Layout>
    );
  } 
}

export default App;
