import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand py-0"
          style={{"backgroundColor": "#1F618D"}}>
        {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mx-auto text-right">
            <li className="navbar-item">
              <Link to="/trendquery1" className="nav-link">TrendQuery1</Link>
            </li>
            <li className="navbar-item">
              <Link to="/trendquery2" className="nav-link">TrendQuery2(S)</Link>
            </li>
            <li className="navbar-item">
              <Link to="/trendquery3" className="nav-link">TrendQuery3(S)</Link>
            </li>
            <li className="navbar-item">
              <Link to="/trendquery4" className="nav-link">TrendQuery4</Link>
            </li>
            <li className="navbar-item">
              <Link to="/trendquery5" className="nav-link">TrendQuery5</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

/*
Format/Template

          <li className="navbar-item nav-link" style={{color: 'red'}}>
            <b>x</b>
          </li>

<li className="navbar-item">
  <Link to="/create_ADL" className="nav-link">Create Custom ADL</Link>
</li>

*/