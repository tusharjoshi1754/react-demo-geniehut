import {SET_READNOTIFY} from '../actions';

const readnotify = (state = [], action) => {
  switch (action.type) {
	case SET_READNOTIFY:
      return [...action.value];  
    default: return state;
  }
}

export default readnotify;
