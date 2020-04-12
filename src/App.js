import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import ReactLogo from "./components/react.logo";
import Logo from "./components/logo.component";
import SectionNavbar from "./components/section.navbar.component";
import Home from "./views/Home";
import FantasyQuery1 from "./views/FantasyQuery1";
import TrendQuery1 from "./views/TrendQuery1";
import TrendQuery2 from "./views/TrendQuery2";
import TrendQuery3 from "./views/TrendQuery3";

import Teams from "./views/Teams";

function App() {
  return (
    <Router>
      <Logo />
      <SectionNavbar />

      <Switch>
          <Route exact path ="/" component={Home} />
          <Route exact path ="/fantasyquery1" component={FantasyQuery1} />
          <Route exact path ="/trendquery1" component={TrendQuery1} />
          <Route exact path ="/trendquery2" component={TrendQuery2} />
          <Route exact path ="/trendquery3" component={TrendQuery3} />

          <Route exact path ="/teams" component={Teams} />
          
          <Route exact path ="/react" component={ReactLogo} />
      </Switch>

    </Router>
  );
}

export default App;
