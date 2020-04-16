import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import ReactLogo from "./components/react.logo";
import Logo from "./components/logo.component";
import SectionNavbar from "./components/section.navbar.component";
import Home from "./views/Home";
import FantasyQueryList from "./views/FantasyQueryList";
import FantasyQuery1 from "./views/FantasyQuery1";
import FantasyQuery2 from "./views/FantasyQuery2";
import FantasyQuery3 from "./views/FantasyQuery3";
import GeneralQueryList from "./views/GeneralQueryList";
import TrendQuery1 from "./views/TrendQuery1";
import TrendQuery2 from "./views/TrendQuery2";
import TrendQuery3 from "./views/TrendQuery3";
import TrendQuery4 from "./views/TrendQuery4";
import TrendQuery5 from "./views/TrendQuery5";

import Teams from "./views/Teams";

function App() {
  return (
    <Router>
      <Logo />
      <SectionNavbar />

      <Switch>
          <Route exact path ="/" component={Home} />
          <Route exact path ="/fantasyquerylist" component={FantasyQueryList} />
          <Route exact path ="/fantasyquery1" component={FantasyQuery1} />
          <Route exact path ="/fantasyquery2" component={FantasyQuery2} />
          <Route exact path ="/fantasyquery3" component={FantasyQuery3} />
          <Route exact path ="/generalquerylist" component={GeneralQueryList} />
          <Route exact path ="/trendquery1" component={TrendQuery1} />
          <Route exact path ="/trendquery2" component={TrendQuery2} />
          <Route exact path ="/trendquery3" component={TrendQuery3} />
          <Route exact path ="/trendquery4" component={TrendQuery4} />
          <Route exact path ="/trendquery5" component={TrendQuery5} />

          <Route exact path ="/teams" component={Teams} />
          
          <Route exact path ="/react" component={ReactLogo} />
      </Switch>

    </Router>
  );
}

export default App;
