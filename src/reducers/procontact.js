import { SET_CONTACT } from '../actions';

const procontact = (state = [], action) => {
  switch (action.type) {
    case SET_CONTACT:
      return [...action.value];
    default: return state;
  }
}

export default procontact;
