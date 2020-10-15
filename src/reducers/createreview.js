import { SET_CREATE_REVIEW } from '../actions';

const createreview = (state = [], action) => {
  switch (action.type) {
    case SET_CREATE_REVIEW:
      return [...action.value];
    default: return state;
  }
}

export default createreview;
