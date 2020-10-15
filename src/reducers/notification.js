import {SET_ALLNOTIFICATION} from '../actions';

const notification = (state = [], action) => {
  switch (action.type) {
	case SET_ALLNOTIFICATION:
      return [...action.value];  
    default: return state;
  }
}

export default notification;
