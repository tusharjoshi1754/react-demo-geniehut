import {SET_SUBMITPOINTSYSTEM} from '../actions';

const submitsystempoints = (state = [], action) => {
  switch (action.type) {
	case SET_SUBMITPOINTSYSTEM:
      return [...action.value];  
    default: return state;
  }
}

export default submitsystempoints;
