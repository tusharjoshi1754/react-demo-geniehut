import {SET_RUNSERVICEACTION} from '../actions';

const runserviceaction = (state = [], action) => {
  switch (action.type) {
	case SET_RUNSERVICEACTION:
      return [...action.value];  
    default: return state;
  }
}

export default runserviceaction;