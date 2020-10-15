import {SET_UPDATESUBSCRIPTION} from '../actions';

const updatesubscription = (state = [], action) => {
  switch (action.type) {
	case SET_UPDATESUBSCRIPTION:
      return [...action.value];  
    default: return state;
  }
}

export default updatesubscription;
