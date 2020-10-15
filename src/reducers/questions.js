import {SET_QUESTIONS} from '../actions';

const questions = (state = [], action) => {
  switch (action.type) {
	case SET_QUESTIONS:
      return [...action.value];  
    default: return state;
  }
}

export default questions;
