import { SET_SELECTRUNSERVICE } from '../actions';

const selectrunservice = (state = [], action) => {
  switch (action.type) {
    case SET_SELECTRUNSERVICE:
      return [...action.value];
    default: return state;
  }
}

export default selectrunservice;
