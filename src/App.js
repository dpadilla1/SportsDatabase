import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import ReactLogo from "./components/react.logo";
import Logo from "./components/logo.component";
import Navbar from "./components/navbar.component";
import Home from "./views/Home";
import TrendQuery1 from "./views/TrendQuery1";
import TrendQuery2 from "./views/TrendQuery2";
import TrendQuery3 from "./views/TrendQuery3";

import Teams from "./views/Teams";
import TestQuery1 from "./views/TestQuery1";

function App() {
  return (
    <Router>
      <Logo />
      <Navbar /><br />

      <Switch>
          <Route exact path ="/" component={Home} />
          <Route exact path ="/trendquery1" component={TrendQuery1} />
          <Route exact path ="/trendquery2" component={TrendQuery2} />
          <Route exact path ="/trendquery3" component={TrendQuery3} />

          <Route exact path ="/teams" component={Teams} />
          <Route exact path ="/testquery1" component={TestQuery1} />
          
          <Route exact path ="/react" component={ReactLogo} />
      </Switch>

    </Router>
  );
}

export default App;
