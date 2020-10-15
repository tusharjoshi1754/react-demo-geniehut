import {SET_SAVEQUOTATION} from '../actions';

const savequotation = (state = [], action) => {
  switch (action.type) {
	case SET_SAVEQUOTATION:
      return [...action.value];  
    default: return state;
  }
}

export default savequotation;
