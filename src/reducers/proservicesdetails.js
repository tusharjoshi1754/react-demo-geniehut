import { SET_PRO_SERVICES_DETAILS } from '../actions';

const proservicesdetails = (state = [], action) => {
  switch (action.type) {
    case SET_PRO_SERVICES_DETAILS:
      return [...action.value];
    default: return state;
  }
}

export default proservicesdetails;
