import {SET_SERVICES} from '../actions';

const services = (state = [], action) => {
  switch (action.type) {
	case SET_SERVICES:
      return [...action.value];  
    default: return state;
  }
}

export default services;
