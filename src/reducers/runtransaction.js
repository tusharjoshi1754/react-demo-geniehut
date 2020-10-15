import { SET_RUNTRANSACTION } from '../actions';

const runtransaction = (state = [], action) => {
  switch (action.type) {
    case SET_RUNTRANSACTION:
      return [...action.value];
    default: return state;
  }
}

export default runtransaction;
