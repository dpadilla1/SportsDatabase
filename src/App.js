import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';

import Logo from "./components/logo.component";

function App() {
  return (
    <Router>
      <Logo />

      <Switch>
        <div className="container">
          <Route exact path ="/">
            <div className="App">
              <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
              </header>
            </div>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
