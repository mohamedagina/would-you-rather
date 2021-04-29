import { RECEIVE_QUESTIONS, SAVE_QUESTION } from '../actions/questions';
import { ANSWER_QUESTION } from '../actions/shared';

const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.questions };
    case SAVE_QUESTION:
      return { ...state, [action.question.id]: action.question };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser
            ])
          }
        }
      };
    default:
      return state;
  }
};
export default questions;
