import { SET_RESENDOTP } from '../actions';

const resendotp = (state = [], action) => {
  switch (action.type) {
	case SET_RESENDOTP:
      return [...action.value];  
    default: return state;
  }
}

export default resendotp;
