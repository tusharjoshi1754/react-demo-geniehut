import { SET_SETPASSWORD } from '../actions';

const setpassword = (state = [], action) => {
  switch (action.type) {
	case SET_SETPASSWORD:
      return [...action.value];  
    default: return state;
  }
}

export default setpassword;
