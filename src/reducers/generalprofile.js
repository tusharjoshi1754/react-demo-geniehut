import { SET_GENERALPROFILE } from '../actions';

const generalprofile = (state = [], action) => {
  switch (action.type) {
	case SET_GENERALPROFILE:
      return [...action.value];  
    default: return state;
  }
}

export default generalprofile;
