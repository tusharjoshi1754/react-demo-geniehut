import { SET_COMPARE_LIST } from '../actions';

const compareList = (state = [], action) => {
  switch (action.type) {
    case SET_COMPARE_LIST:
      return [...action.value];
    default: return state;
  }
}

export default compareList;
