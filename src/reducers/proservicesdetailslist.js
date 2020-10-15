import { SET_PRO_SERVICES_DETAILS_LIST } from '../actions';

const proservicesdetails = (state = [], action) => {
  switch (action.type) {
    case SET_PRO_SERVICES_DETAILS_LIST:
      return [...action.value];
    default: return state;
  }
}

export default proservicesdetails;
