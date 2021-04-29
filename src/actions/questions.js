import { saveQuestion } from '../utils/api';
import { formatQuestion } from '../utils/helpers';

import { toggleLoading } from './loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export const receiveQuestions = questions => {
  return { type: RECEIVE_QUESTIONS, questions };
};

export const saveQuestionAction = question => {
  return {
    type: SAVE_QUESTION,
    question: question
  };
};

export const handleSaveQuestion = question => dispatch => {
  dispatch(toggleLoading());
  const formattedQuestion = formatQuestion(question);
  return saveQuestion(formattedQuestion)
    .then(() => {
      dispatch(saveQuestionAction(formattedQuestion));
      dispatch(toggleLoading());
    })
    .catch(e => {
      console.warn('Error in handleSaveQuestion : ', e);
      alert('some error happened, please try again.');
    });
};
