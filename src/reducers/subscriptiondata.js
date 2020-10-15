import {SET_SUBSCRIPTIONDATA} from '../actions';

const subscriptiondata = (state = [], action) => {
  switch (action.type) {
	case SET_SUBSCRIPTIONDATA:
      return [...action.value];  
    default: return state;
  }
}

export default subscriptiondata;
