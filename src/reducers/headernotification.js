import {SET_HEADERNOTIFICATION} from '../actions';

const headernotification = (state = [], action) => {
  switch (action.type) {
	case SET_HEADERNOTIFICATION:
      return [...action.value];  
    default: return state;
  }
}

export default headernotification;
