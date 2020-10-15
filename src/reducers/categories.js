import {SET_CATEGORIES} from '../actions';

const categories = (state = [], action) => {
  switch (action.type) {
	case SET_CATEGORIES:
      return [...action.value];  
    default: return state;
  }
}

export default categories;