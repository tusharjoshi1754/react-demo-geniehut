import { SET_ASKTOCALL } from '../actions';

const asktocall = (state = [], action) => {
  switch (action.type) {
    case SET_ASKTOCALL:
      return [...action.value];
    default: return state;
  }
}

export default asktocall;
