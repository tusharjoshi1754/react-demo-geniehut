import { SET_POINTS } from '../actions';

const points = (state = [], action) => {
  switch (action.type) {
    case SET_POINTS:
      return [...action.value];
    default: return state;
  }
}

export default points;
