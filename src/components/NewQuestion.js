import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import { handleSaveQuestion } from '../actions/questions';

import '../stylesheets/NewQuestion.scss';

class NewQuestion extends Component {
  optionOne = createRef();
  optionTwo = createRef();

  handleSubmit = e => {
    e.preventDefault();
    if (this.optionOne.current.value && this.optionTwo.current.value) {
      const question = {
        optionOneText: this.optionOne.current.value,
        optionTwoText: this.optionTwo.current.value,
        author: this.props.authedUser
      };
      this.props.dispatch(handleSaveQuestion(question));
      if (!this.props.loading)
        setTimeout(() => {
          this.props.history.push('/');
        }, 500);
    }
  };
  render() {
    return (
      <div className="new-question">
        <form onSubmit={this.handleSubmit} className="question-form">
          <div className="form-header">Create New Question</div>
          Complete the question.
          <h2>Would You Rather ...</h2>
          <input
            ref={this.optionOne}
            placeholder="Enter first option ..."
          ></input>
          OR
          <input
            ref={this.optionTwo}
            placeholder="Enter second option ..."
          ></input>
          <button type="submit">Create New Poll</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, loading }) => {
  return { authedUser, loading };
};
export default connect(mapStateToProps)(NewQuestion);
