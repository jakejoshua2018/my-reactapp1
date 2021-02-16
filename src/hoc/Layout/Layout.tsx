import React from 'react';

import Toolbar from '../../components/UI/Toolbar/Toolbar';
import classes from './Layout.module.css';


const Layout = (props: any) => {

  return (
    <div className={classes.Layout}>
        <Toolbar/>
        <main>
            { props.children }
        </main>
        <div className="w3-container w3-red">
          <h5>copyright@DCSInfoway2021</h5>
        </div>      
    </div>
  );
}

export default Layout;
