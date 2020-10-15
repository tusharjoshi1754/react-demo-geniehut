import {SET_ALLPROSERVICES} from '../actions';

const proallservices = (state = [], action) => {
  switch (action.type) {
	case SET_ALLPROSERVICES:
      return [...action.value];  
    default: return state;
  }
}

export default proallservices;
