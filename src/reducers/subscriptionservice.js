import {SET_SERVICESUBSCRIPTION} from '../actions';

const subscriptionservice = (state = [], action) => {
  switch (action.type) {
	case SET_SERVICESUBSCRIPTION:
      return [...action.value];  
    default: return state;
  }
}

export default subscriptionservice;
