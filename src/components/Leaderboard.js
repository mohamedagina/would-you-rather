import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/Leaderboard.scss';

class Leaderboard extends Component {
  render() {
    const { users, userRank } = this.props;
    return (
      <div className="leaderboard-page">
        <div className="leaderboard">
          <p>
            Your rank : <span>{userRank}</span>
          </p>
          {users.map(user => (
            <div
              key={user.id}
              className={`user-card ${user.authed ? 'authed' : ''}`}
            >
              <img src={user.avatar} alt={`Avatar of ${user.name}`}></img>
              <div className="user-info">
                <h3>{user.name}</h3>
                <span>
                  Made <b>{user.numQ}</b>{' '}
                  {user.numQ > 1 ? 'Questions' : 'Question'}
                </span>
                <span>
                  Answered <b>{user.numA}</b>{' '}
                  {user.numA > 1 ? 'Questions' : 'Question'}
                </span>
              </div>
              <div className="score">
                Score<span>{user.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ users, authedUser }) => {
  const formatedUsers = Object.keys(users)
    .map(user => {
      user = users[user];
      return {
        id: user.id,
        avatar: user.avatarURL,
        name: user.name,
        numQ: user.questions.length,
        numA: Object.keys(user.answers).length,
        authed: user.id === authedUser,
        score: user.questions.length + Object.keys(user.answers).length
      };
    })
    .sort((a, b) => b.score - a.score);
  const userRank = formatedUsers.findIndex(user => user.id === authedUser) + 1;
  return { users: formatedUsers, userRank };
};
export default connect(mapStateToProps)(Leaderboard);
