import {SET_CAPTUREAMOUNT} from '../actions';

const captureamount = (state = [], action) => {
  switch (action.type) {
	case SET_CAPTUREAMOUNT:
      return [...action.value];  
    default: return state;
  }
}

export default captureamount;
