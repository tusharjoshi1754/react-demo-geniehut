import {SET_POSTALADDRESS} from '../actions';

const postaladdress = (state = [], action) => {
  switch (action.type) {
	case SET_POSTALADDRESS:
      return [...action.value];  
    default: return state;
  }
}

export default postaladdress;
