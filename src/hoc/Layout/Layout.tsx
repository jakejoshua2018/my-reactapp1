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
    </div>
  );
}

export default Layout;
