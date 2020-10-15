import { SET_REVIEW } from '../actions';

const review = (state = [], action) => {
  switch (action.type) {
	case SET_REVIEW:
      return [...action.value];  
    default: return state;
  }
}

export default review;