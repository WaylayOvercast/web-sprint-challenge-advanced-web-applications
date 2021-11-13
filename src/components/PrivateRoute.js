import React from "react";
import { Route, Redirect } from "react-router-dom";
import Logout from './Logout';
import View from './View';

function PrivateRoute() {

  if (localStorage.getItem("token")) {
    return (
    <>
      <Route path='/view'>
        <View/>
      </Route>
      <Route path='/logout'>
        <Logout/>
      </Route>
    </> 
    );
  } else {
    return <Redirect to="/"/>
  }

}

export default PrivateRoute;

//Task List:
//1. Complete PrivateRoute