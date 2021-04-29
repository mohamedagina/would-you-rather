import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Error from './Error';

class SingleQuestion extends Component {
  render() {
    const { slug } = this.props.match.params;
    const { questionIds } = this.props;
    if (!questionIds.includes(slug)) return <Error />;
    return (
      <div className="single-question">
        <Question single="true" id={slug} />
      </div>
    );
  }
}

export default connect(({ questions }) => {
  return { questionIds: Object.keys(questions) };
})(SingleQuestion);
