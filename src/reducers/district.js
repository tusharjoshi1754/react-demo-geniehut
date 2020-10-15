import { SET_DISTRICT } from '../actions';

const district = (state = [], action) => {
  switch (action.type) {
    case SET_DISTRICT:
      return [...action.value];
    default: return state;
  }
}

export default district;
