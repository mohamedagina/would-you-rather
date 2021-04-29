import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/Error.scss';

export default class Error extends Component {
  render() {
    return (
      <div className="error-page">
        <div className="error-container">
          Error 404 Page Not Found.
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
}
