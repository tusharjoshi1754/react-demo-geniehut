import { SET_FOLLOW } from '../actions';

const follows = (state = [], action) => {
  switch (action.type) {
    case SET_FOLLOW:
      return [...action.value];
    default: return state;
  }
}
export default follows;