import {SET_TOPUPPLAN} from '../actions';

const buypoints = (state = [], action) => {
  switch (action.type) {
	case SET_TOPUPPLAN:
      return [...action.value];  
    default: return state;
  }
}

export default buypoints;
