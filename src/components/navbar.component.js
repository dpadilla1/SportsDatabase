import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand py-0"
          style={{"backgroundColor": "#1F618D"}}>
        {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav ml-auto text-right">
            <li className="navbar-item">
              <Link to="/trendquery1" className="nav-link">TrendQuery1</Link>
            </li>
            <li className="navbar-item">
              <Link to="/trendquery2" className="nav-link">TrendQuery2</Link>
            </li>
            <li className="navbar-item">
              <Link to="/trendquery3" className="nav-link">TrendQuery3</Link>
            </li>
            <li className="navbar-item">
              <Link to="/trendquery18" className="nav-link">TrendQuery18</Link>
            </li>
            <li className="navbar-item">
              <Link to="/teams" className="nav-link">Teams</Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="nav-link">NFL</Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="nav-link">MLB</Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="nav-link">NHL</Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="nav-link">NBA</Link>
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