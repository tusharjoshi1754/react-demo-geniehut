import { SET_OTP } from '../actions';

const otp = (state = [], action) => {
  switch (action.type) {
	case SET_OTP:
      return [...action.value];  
    default: return state;
  }
}

export default otp;
