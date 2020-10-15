import { SET_TRANSFER } from '../actions';

const transfer = (state = [], action) => {
  switch (action.type) {
    case SET_TRANSFER:
      return [...action.value];
    default: return state;
  }
}

export default transfer;
