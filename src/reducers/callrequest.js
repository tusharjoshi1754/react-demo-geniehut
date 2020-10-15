import { SET_CALLREQUEST } from '../actions';

const callrequest = (state = [], action) => {
  switch (action.type) {
    case SET_CALLREQUEST:
      return [...action.value];
    default: return state;
  }
}

export default callrequest;
