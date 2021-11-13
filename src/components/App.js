import React, { useState} from 'react';
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import styled from 'styled-components';

import Header from './Header';
import LambdaHeader from './LambdaHeader';
import Login from './Login';



const App = () => {

  const [global, setGlobal] = useState({
    auth: {
      isLogged: false,
    }
  })
  

  return (
    <AppContainer>
      <LambdaHeader/>
      <Header/>
      <RouteContainer>
        <Route exact path="/">
          { !localStorage.username &&
            <Login/>
          }
        </Route>
        {/* not sure why instructed to do this in readme line 30 */}
        { !localStorage.username &&
          <Route path='/login'> 
            <Login/> 
          </Route>
        }
        <Route path='/view'>
          <PrivateRoute/>
        </Route>
                
      </RouteContainer>
    </AppContainer>
  )
}

export default App;

//Task List
//1. Create and import PrivateRoute component.
//2. Create a Route for Login pointing to '/login.'
//3. Create a PrivateRoute for View component point to '/view.'
//4. Create a PrivateRoute for Logout component pointing to '/logout.'


const AppContainer = styled.div`
  height: 100%;
`
const RouteContainer = styled.div`
  display: flex;
  height: 85%;
  align-items: center;
  flex-direction: column;
`
