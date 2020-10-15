import {SET_HOMESERVICES} from '../actions';

const homeservices = (state = [], action) => {
  switch (action.type) {
	case SET_HOMESERVICES:
      return [...action.value];  
    default: return state;
  }
}

export default homeservices;
