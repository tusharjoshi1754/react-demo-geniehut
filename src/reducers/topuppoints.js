import {SET_TOPUPPOINTS} from '../actions';

const topuppoints = (state = [], action) => {
  switch (action.type) {
	case SET_TOPUPPOINTS:
      return [...action.value];  
    default: return state;
  }
}

export default topuppoints;
