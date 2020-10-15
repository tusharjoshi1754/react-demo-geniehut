import {SET_PRO_QUESTIONS} from '../actions';

const proquestions = (state = [], action) => {
  switch (action.type) {
	case SET_PRO_QUESTIONS:
      return [...action.value];  
    default: return state;
  }
}

export default proquestions;
