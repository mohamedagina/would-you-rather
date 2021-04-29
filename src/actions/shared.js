import { getInitialData, saveQuestionAnswer } from '../utils/api';

import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export const handleInitialData = () => dispatch => {
  return getInitialData().then(({ questions, users }) => {
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
  });
};

const answerQustion = ({ qid, authedUser, answer }) => {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer
  };
};

export const handleAnswerQustion = info => dispatch => {
  return saveQuestionAnswer(info)
    .then(() => {
      dispatch(answerQustion(info));
    })
    .catch(e => {
      console.warn('Error in handleAnswerQustion : ', e);
      alert('some error happened, please try again.');
    });
};
