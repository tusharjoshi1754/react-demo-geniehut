import { SET_AVAILTRANSACTION } from '../actions';

const availtransaction = (state = [], action) => {
  switch (action.type) {
    case SET_AVAILTRANSACTION:
      return [...action.value];
    default: return state;
  }
}

export default availtransaction;
