import {SET_STRIPONTOKEN} from '../actions';

const stripontoken = (state = [], action) => {
  switch (action.type) {
	case SET_STRIPONTOKEN:
      return [...action.value];  
    default: return state;
  }
}

export default stripontoken;
