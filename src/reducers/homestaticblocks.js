import {SET_HOMEBLOCKCONTENT} from '../actions';

const homestaticblocks = (state = [], action) => {
  switch (action.type) {
	case SET_HOMEBLOCKCONTENT:
      return [...action.value];  
    default: return state;
  }
}

export default homestaticblocks;