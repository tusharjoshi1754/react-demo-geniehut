import {SET_GENERALDASHBOARD} from '../actions';

const generaldashboard = (state = [], action) => {
  switch (action.type) {
	case SET_GENERALDASHBOARD:
      return [...action.value];  
    default: return state;
  }
}

export default generaldashboard;
