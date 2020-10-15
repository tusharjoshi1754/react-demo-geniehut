import { SET_CREATE_FOLLOW } from '../actions';

const createfollows = (state = [], action) => {
  switch (action.type) {
    case SET_CREATE_FOLLOW:
      return [...action.value];
    default: return state;
  }
}

export default createfollows;
