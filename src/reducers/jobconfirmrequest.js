import { SET_JOBCONFIRMREQUEST } from '../actions';

const jobconfirmrequest = (state = [], action) => {
  switch (action.type) {
	case SET_JOBCONFIRMREQUEST:
      return [...action.value];  
    default: return state;
  }
}

export default jobconfirmrequest;