import {SET_RUNDETAILCUSTOMERLEADS} from '../actions';

const rundetailcustomerleads = (state = [], action) => {
  switch (action.type) {
	case SET_RUNDETAILCUSTOMERLEADS:
      return [...action.value];  
    default: return state;
  }
}

export default rundetailcustomerleads;
