import { SET_CREATECOUNTER } from '../actions';

const createcounter = (state = [], action) => {
  switch (action.type) {
    case SET_CREATECOUNTER:
      return [...action.value];
    default: return state;
  }
}

export default createcounter;
