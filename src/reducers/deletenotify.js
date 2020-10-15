import {SET_DELETENOTIFICATION} from '../actions';

const deletenotify = (state = [], action) => {
  switch (action.type) {
	case SET_DELETENOTIFICATION:
      return [...action.value];  
    default: return state;
  }
}

export default deletenotify;
