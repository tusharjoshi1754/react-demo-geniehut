import { SET_GENPROCALLREQUEST } from '../actions';

const genprocallrequest = (state = [], action) => {
  switch (action.type) {
    case SET_GENPROCALLREQUEST:
      return [...action.value];
    default: return state;
  }
}

export default genprocallrequest;
