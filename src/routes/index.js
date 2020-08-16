import React from 'react';
import { connect } from "react-redux";

import HomeDrawer from "./HomeDrawer";
import AuthStack from "./AuthStack";


const Routes = props => {
  if(!props.token) {
    return <AuthStack />;
  }

  return <HomeDrawer />;
}

const mapStateToProps = state => {
  return {
    token: state.userReducer.token
  }
}

export default connect(mapStateToProps)(Routes);
