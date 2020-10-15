import {SET_LEADINFO} from '../actions';

const leadinfo = (state = [], action) => {
  switch (action.type) {
	case SET_LEADINFO:
      return [...action.value];  
    default: return state;
  }
}

export default leadinfo;