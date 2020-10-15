import { SET_CONTACTUS } from '../actions';

const contactus = (state = [], action) => {
  switch (action.type) {
	case SET_CONTACTUS:
      return [...action.value];  
    default: return state;
  }
}

export default contactus;
