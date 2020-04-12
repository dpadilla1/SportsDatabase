import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg"
            style={{"backgroundColor": "#183163"}}>
        <div className="collpase navbar-collapse">
            <Link to="/" className="navbar-brand mx-auto"><b>Sports Database</b></Link>
        </div>
      </nav>
    );
  }
}

// dark blue
// style={{"backgroundColor": "#0C2597"}}