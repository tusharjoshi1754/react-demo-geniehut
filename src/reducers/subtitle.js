import { SET_SUBTITLE } from '../actions';

const subtitle = (state = [], action) => {
  switch (action.type) {
    case SET_SUBTITLE:
      return [...action.value];
    default: return state;
  }
}

export default subtitle;
