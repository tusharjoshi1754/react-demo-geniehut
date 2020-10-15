import { SET_PROJOBS } from '../actions';

const projobs = (state = [], action) => {
  switch (action.type) {
	case SET_PROJOBS:
      return [...action.value];  
    default: return state;
  }
}

export default projobs;