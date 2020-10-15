import {SET_PROSERVICES} from '../actions';

const proservices = (state = [], action) => {
  switch (action.type) {
	case SET_PROSERVICES:
      return [...action.value];  
    default: return state;
  }
}

export default proservices;
