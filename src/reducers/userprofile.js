import { SET_USERPROFILE } from '../actions';

const userprofile = (state = [], action) => {
  switch (action.type) {
    case SET_USERPROFILE:
      return [...action.value];
    default: return state;
  }
}

export default userprofile;
