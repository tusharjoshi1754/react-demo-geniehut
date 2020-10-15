import { SET_RUNCUSTOMERLEADS } from '../actions';

const runcustomerleads = (state = [], action) => {
  switch (action.type) {
	case SET_RUNCUSTOMERLEADS:
      return [...action.value];  
    default: return state;
  }
}

export default runcustomerleads;