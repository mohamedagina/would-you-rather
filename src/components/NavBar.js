import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAuthedUser } from '../actions/authedUser';

import '../stylesheets/NavBar.scss';

import { TiHomeOutline } from 'react-icons/ti';
import { GiRank3 } from 'react-icons/gi';
import { RiChatNewLine } from 'react-icons/ri';

class NavBar extends Component {
  handleLogout = () => {
    this.props.dispatch(setAuthedUser(null));
  };
  render() {
    const { avatarURL, name } = this.props.user;
    return (
      <header>
        <nav>
          <Link to="/">
            <TiHomeOutline /> Home
          </Link>
          <Link to="/add">
            <RiChatNewLine /> New Question
          </Link>
          <Link to="/leaderboard">
            <GiRank3 /> Leader Board
          </Link>
        </nav>
        <div className="user-section">
          <div className="authed-user">
            <img src={avatarURL} alt={`Avatar of ${name}`}></img>
            <span>{name}</span>
          </div>
          <button onClick={this.handleLogout} className="logout">
            Logout
          </button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  const user = users[authedUser];
  return { user };
};
export default connect(mapStateToProps)(NavBar);
