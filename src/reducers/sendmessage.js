import { SET_SEND_MESSAGE } from '../actions';

const sendmessage = (state = [], action) => {
  switch (action.type) {
    case SET_SEND_MESSAGE:
      return [...action.value];
    default: return state;
  }
}

export default sendmessage;
