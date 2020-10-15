import { SET_ACCEPTCOUNTER } from '../actions';

const acceptcounter = (state = [], action) => {
  switch (action.type) {
    case SET_ACCEPTCOUNTER:
      return [...action.value];
    default: return state;
  }
}

export default acceptcounter;
