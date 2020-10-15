import { SET_CUSTOMER_TRANS_DETAILS } from '../actions';

const customertransdetails = (state = [], action) => {
  switch (action.type) {
    case SET_CUSTOMER_TRANS_DETAILS:
      return [...action.value];
    default: return state;
  }
}

export default customertransdetails;
