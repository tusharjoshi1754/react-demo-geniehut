import { SET_PRETRANSACTION } from '../actions';

const pretransaction = (state = [], action) => {
  switch (action.type) {
    case SET_PRETRANSACTION:
      return [...action.value];
    default: return state;
  }
}

export default pretransaction;

