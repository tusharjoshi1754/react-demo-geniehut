import { SET_JOBAPPLIED } from '../actions';

const jobapplied = (state = [], action) => {
  switch (action.type) {
    case SET_JOBAPPLIED:
      return [...action.value];
    default: return state;
  }
}

export default jobapplied;
