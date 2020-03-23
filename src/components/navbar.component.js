import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
        <div className="collpase navbar-collapse">
          {/*<ul className="navbar-nav mr-auto text-right">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
          </ul>*/}
          <ul className="navbar-nav mx-auto text-right">
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
            <li className="navbar-item">
              <Link to="/testquery1" className="nav-link">Test-Query-1</Link>
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