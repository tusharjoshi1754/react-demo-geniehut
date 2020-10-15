import { SET_IMAGEPROFILE } from '../actions';

const imageprofile = (state = [], action) => {
  switch (action.type) {
	case SET_IMAGEPROFILE:
      return [...action.value];  
    default: return state;
  }
}

export default imageprofile;
