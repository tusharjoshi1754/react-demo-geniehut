import { SET_UNSETTOKEN } from '../actions';

const unsettoken = (state = [], action) => {
  switch (action.type) {
	case SET_UNSETTOKEN:
      return [...action.value];  
    default: return state;
  }
}

export default unsettoken;