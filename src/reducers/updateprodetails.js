import { SET_PROUSERDETAILS } from '../actions';

const updateprodetails = (state = [], action) => {
  switch (action.type) {
    case SET_PROUSERDETAILS:
      return [...action.value];
    default: return state;
  }
}

export default updateprodetails;
