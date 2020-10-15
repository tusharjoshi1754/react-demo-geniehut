import {SET_STATICBLOCKCONTENT} from '../actions';

const staticblocks = (state = [], action) => {
  switch (action.type) {
	case SET_STATICBLOCKCONTENT:
      return [...action.value];  
    default: return state;
  }
}

export default staticblocks;