import { SET_FORGETPASSWORD } from '../actions';

const forgetpassword = (state = [], action) => {
  switch (action.type) {
	case SET_FORGETPASSWORD:
      return [...action.value];  
    default: return state;
  }
}

export default forgetpassword;
