import { SET_UPDATE_PRO_QUESTIONS } from '../actions';

const proupdatequestion = (state = [], action) => {
  switch (action.type) {
    case SET_UPDATE_PRO_QUESTIONS:
      return [...action.value];
    default: return state;
  }
}

export default proupdatequestion;
