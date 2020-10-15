import { SET_CUSTOMER_TRANS } from '../actions';

const customertrans = (state = [], action) => {
  switch (action.type) {
    case SET_CUSTOMER_TRANS:
      return [...action.value];
    default: return state;
  }
}

export default customertrans;
