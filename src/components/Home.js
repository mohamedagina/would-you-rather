import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/Home.scss';

import Question from './Question';

class Home extends Component {
  state = {
    showAnswered: false
  };

  render() {
    const questionIds = this.state.showAnswered
      ? this.props.answered
      : this.props.unAnswered;

    return (
      <main>
        <div className="questions-list">
          <div onClick={this.handleTabs} className="list-nav">
            <span
              className={!this.state.showAnswered ? 'active' : ''}
              onClick={() => this.setState({ showAnswered: false })}
            >
              Unanswered
            </span>
            <span
              className={this.state.showAnswered ? 'active' : ''}
              onClick={() => this.setState({ showAnswered: true })}
            >
              Answered
            </span>
          </div>
          {questionIds.map(id => (
            <Question key={id} id={id} />
          ))}
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ questions, authedUser, users }) => {
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unAnswered = questionIds.filter(
    qid => !Object.keys(users[authedUser].answers).includes(qid)
  );
  const answered = questionIds.filter(qid =>
    Object.keys(users[authedUser].answers).includes(qid)
  );
  return { answered, unAnswered };
};
export default connect(mapStateToProps)(Home);
