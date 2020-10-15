import { SET_USERWALLETINFO } from '../actions';

const userwalletinfo = (state = [], action) => {
  switch (action.type) {
	case SET_USERWALLETINFO:
      return [...action.value];  
    default: return state;
  }
}

export default userwalletinfo;