import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';
import Register from './components/user/Register';
import Login from './components/user/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import setJWTToken from './utils/setJWTToken';
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from './actions/types';
import { logout } from "./actions/userActions";
//Récupération du token stocké en local
const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decodedJwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedJwtToken,
  });
  const currentTime = Date.now() / 1000;
  if (decodedJwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div>
            <Header />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;