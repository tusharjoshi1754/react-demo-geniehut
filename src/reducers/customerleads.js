import { SET_CUSTOMERLEADS } from '../actions';

const customerleads = (state = [], action) => {
  switch (action.type) {
	case SET_CUSTOMERLEADS:
      return [...action.value];  
    default: return state;
  }
}

export default customerleads;