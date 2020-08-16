import React from 'react';
import { connect } from "react-redux";

import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";


const Routes = props => {
  if(props.token) {
    return <AuthStack />;
  }

  return <HomeStack />;
}

const mapStateToProps = state => {
  return {
    token: state.userReducer.token
  }
}

export default connect(mapStateToProps)(Routes);
