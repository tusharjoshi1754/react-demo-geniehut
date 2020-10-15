import { SET_REQUESTSERVICE } from '../actions';

const service = (state = [], action) => {
  switch (action.type) {
    case SET_REQUESTSERVICE:
      return [...action.value];
    default: return state;
  }
}

export default service;
