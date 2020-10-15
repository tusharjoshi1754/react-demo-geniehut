import { SET_TRANSACTIONDETAILS } from '../actions';

const transactiondetails = (state = [], action) => {
  switch (action.type) {
	case SET_TRANSACTIONDETAILS:
      return [...action.value];  
    default: return state;
  }
}

export default transactiondetails;
