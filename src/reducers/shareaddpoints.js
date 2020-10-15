import {SET_SHAREADDPOINT} from '../actions';

const shareaddpoints = (state = [], action) => {
  switch (action.type) {
	case SET_SHAREADDPOINT:
      return [...action.value];  
    default: return state;
  }
}

export default shareaddpoints;
