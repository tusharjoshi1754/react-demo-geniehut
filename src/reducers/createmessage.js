import { SET_CREATE_MESSAGE } from '../actions';

const createmessage = (state = [], action) => {
  switch (action.type) {
    case SET_CREATE_MESSAGE:
      return [...action.value];
    default: return state;
  }
}

export default createmessage;
