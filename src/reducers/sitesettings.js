import {SET_SITESETTINGS} from '../actions';

const sitesettings = (state = [], action) => {
  switch (action.type) {
	case SET_SITESETTINGS:
      return [...action.value];  
    default: return state;
  }
}

export default sitesettings;