import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SectionNavbar extends Component {

  render() {
    return (
        <div className = "row">
            <div className = "col left-section">
                <nav className="navbar navbar-dark navbar-expand py-0" 
                    style={{"backgroundColor": "#AF601A"}}>
                    {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mx-auto text-right">
                            <li className="navbar-item active">
                                <Link to="/fantasyquery1" className="nav-link">Fantasy</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className = "col-1 mid-section">
            <nav className="navbar navbar-dark bg-dark navbar-expand py-0">
                    {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mx-auto text-right">
                            <li className="navbar-item active">
                                <Link to="/" className="nav-link">About</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className = "col right-section">
            <nav className="navbar navbar-dark navbar-expand py-0"
                    style={{"backgroundColor": "#1F618D"}}>
                    {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mx-auto text-right">
                            <li className="navbar-item active">
                                <Link to="/trendquery1" className="nav-link">General</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
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