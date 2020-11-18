import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}> {/* 在使用處設定CSS */}
      <Logo />
    </div>
    <ul className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </ul>
  </header>
)

export default toolbar;