import { SET_ENABLETYPE } from '../actions';

const enabletype = (state = [], action) => {
	
  switch (action.type) {
    case SET_ENABLETYPE:
      return [...action.value];
    default: return state;
  }
}

export default enabletype;
