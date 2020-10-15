import { SET_GEN_MESSAGE } from '../actions';

const genmessage = (state = [], action) => {
  switch (action.type) {
    case SET_GEN_MESSAGE:
      return [...action.value];
    default: return state;
  }
}
export default genmessage;