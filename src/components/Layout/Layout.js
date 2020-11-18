import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDraw: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDraw: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((preState) => { //Don't use showSideDraw: !this.state.showSideDraw
      return {showSideDraw: !preState.showSideDraw}
    })
  }

  render () {
    return (
      <Aux>
        <SideDrawer 
          isAuth={this.props.isAuthenticated} 
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDraw}/>
        <Toolbar 
          isAuth={this.props.isAuthenticated} 
          drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);