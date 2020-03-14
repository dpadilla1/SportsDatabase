import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Web App</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        </ul>
        </div>
      </nav>
    );
  }
}