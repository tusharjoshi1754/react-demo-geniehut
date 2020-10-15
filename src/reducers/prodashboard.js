import {SET_PRODASHBOARD} from '../actions';

const prodashboard = (state = [], action) => {
  switch (action.type) {
	case SET_PRODASHBOARD:
      return [...action.value];  
    default: return state;
  }
}

export default prodashboard;
