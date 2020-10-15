import { SET_GENRUNPROFILE } from '../actions';

const genrunprofile = (state = [], action) => {
  switch (action.type) {
	case SET_GENRUNPROFILE:
      return [...action.value];  
    default: return state;
  }
}

export default genrunprofile;
