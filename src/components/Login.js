import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/Login.scss';

import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  selected = createRef();

  handleLogin = e => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(this.selected.current.value));
  };
  render() {
    const { users } = this.props;
    return (
      <div className="login-page">
        <form onSubmit={this.handleLogin} className="login-form">
          <h2>Sign In</h2>
          <select ref={this.selected}>
            {Object.keys(users).map(userId => (
              <option key={userId} value={userId}>
                {users[userId].name}
              </option>
            ))}
          </select>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};
export default connect(mapStateToProps)(Login);
