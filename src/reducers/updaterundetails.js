import { SET_RUNUSERDETAILS } from '../actions';

const updaterundetails = (state = [], action) => {
  switch (action.type) {
    case SET_RUNUSERDETAILS:
      return [...action.value];
    default: return state;
  }
}

export default updaterundetails;
