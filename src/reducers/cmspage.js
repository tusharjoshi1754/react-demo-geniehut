import {SET_CMSPAGE} from '../actions';

const cmspage = (state = [], action) => {
  switch (action.type) {
	case SET_CMSPAGE:
      return [...action.value];  
    default: return state;
  }
}

export default cmspage;