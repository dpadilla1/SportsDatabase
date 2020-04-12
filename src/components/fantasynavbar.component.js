import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FantasyNavbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand py-0"
          style={{"backgroundColor": "#AF601A"}}>
        {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mx-auto text-right">
            <li className="navbar-item">
              <Link to="/fantasyquery1" className="nav-link">FantasyQuery1</Link>
            </li>
            <li className="navbar-item">
              <Link to="/fantasyquery2" className="nav-link">FantasyQuery2</Link>
            </li>
            <li className="navbar-item">
              <Link to="/fantasyquery3" className="nav-link">FantasyQuery3</Link>
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