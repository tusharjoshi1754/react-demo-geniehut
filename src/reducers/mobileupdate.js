import {SET_MOBILEUPDATE} from '../actions';

const mobileupdate = (state = [], action) => {
  switch (action.type) {
	case SET_MOBILEUPDATE:
      return [...action.value];  
    default: return state;
  }
}

export default mobileupdate;
