import { SET_GENPROPROFILE } from '../actions';

const genproprofile = (state = [], action) => {
  switch (action.type) {
	case SET_GENPROPROFILE:
      return [...action.value];  
    default: return state;
  }
}

export default genproprofile;
