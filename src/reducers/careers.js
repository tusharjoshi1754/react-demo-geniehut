import { SET_CAREERS } from '../actions';

const careers = (state = [], action) => {
  switch (action.type) {
    case SET_CAREERS:
      return [...action.value];
    default: return state;
  }
}

export default careers;
