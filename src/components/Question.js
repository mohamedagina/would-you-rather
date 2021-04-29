import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleAnswerQustion } from '../actions/shared';

import '../stylesheets/Question.scss';

class Question extends Component {
  getAnswer = () => {
    const opts = document.getElementsByName('answer');
    let ans = -1;
    opts.forEach(opt => {
      if (opt.checked) ans = opt.value;
    });
    return ans;
  };

  submitAnswer = () => {
    const ans = this.getAnswer();
    if (ans !== -1) {
      const { question, user, dispatch } = this.props;
      dispatch(
        handleAnswerQustion({
          qid: question.id,
          authedUser: user.id,
          answer: ans
        })
      );
    }
  };

  ProgressBar = ({ percent }) => {
    return (
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${percent}%` }}
        >{`${percent}%`}</div>
      </div>
    );
  };

  render() {
    const {
      question,
      userAnswer,
      author,
      single,
      answered,
      opOneVotes,
      opTwoVotes,
      totalvotes,
      opOnePercent,
      opTwoPercent
    } = this.props;
    return (
      <div className="question-card">
        <div className="question-header">{author.name} asks:</div>
        <div className="question-body">
          <h2>Would You Rather ...</h2>
          <div
            className={`question ${
              single && answered ? 'result-container' : ''
            }`}
          >
            {single ? (
              !answered ? (
                <>
                  <label>
                    <input name="answer" type="radio" value="optionOne"></input>
                    {question.optionOne.text}
                  </label>
                  <label>
                    <input name="answer" type="radio" value="optionTwo"></input>
                    {question.optionTwo.text}
                  </label>
                  <button onClick={this.submitAnswer}>Submit</button>
                </>
              ) : (
                <>
                  <div className="author-avatar">
                    <img
                      src={author.avatarURL}
                      alt={`Avatar of ${author.name}`}
                    ></img>
                  </div>
                  <div className="poll-result">
                    <div
                      className={`option-result ${
                        userAnswer === 'optionOne' ? 'user-answer' : ''
                      }`}
                    >
                      {question.optionOne.text}
                      <this.ProgressBar percent={opOnePercent} />
                      <span>{`${opOneVotes} out of ${totalvotes}`}</span>
                    </div>
                    <div
                      className={`option-result ${
                        userAnswer === 'optionTwo' ? 'user-answer' : ''
                      }`}
                    >
                      {question.optionTwo.text}
                      <this.ProgressBar percent={opTwoPercent} />
                      <span>{`${opTwoVotes} out of ${totalvotes}`}</span>
                    </div>
                  </div>
                </>
              )
            ) : (
              <>
                <div>.....</div>
                <Link to={`/questions/${question.id}`}>View Poll</Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users, questions }, { id, single }) => {
  const question = questions[id];
  const user = users[authedUser];
  const author = users[question.author];
  const answered = Object.keys(user.answers).includes(id);
  const userAnswer = user.answers[id];
  const opOneVotes = question.optionOne.votes.length;
  const opTwoVotes = question.optionTwo.votes.length;
  const totalvotes = opOneVotes + opTwoVotes;
  const opOnePercent = Math.floor((opOneVotes / totalvotes) * 100);
  const opTwoPercent = Math.floor((opTwoVotes / totalvotes) * 100);
  return {
    question,
    user,
    userAnswer,
    author,
    single,
    answered,
    opOneVotes,
    opTwoVotes,
    totalvotes,
    opOnePercent,
    opTwoPercent
  };
};
export default connect(mapStateToProps)(Question);
