import { SET_IPDATA } from '../actions';

const ip = (state = [], action) => {
  switch (action.type) {
	case SET_IPDATA:
      return [...action.value];  
    default: return state;
  }
}

export default ip;
