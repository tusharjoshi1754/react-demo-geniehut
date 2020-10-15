import {SET_CHANGEMOBILE} from '../actions';

const changemobile = (state = [], action) => {
  switch (action.type) {
	case SET_CHANGEMOBILE:
      return [...action.value];  
    default: return state;
  }
}

export default changemobile;
