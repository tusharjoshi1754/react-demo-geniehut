import { SET_PROSERVICEUPDATE } from '../actions';

const updateproservices = (state = [], action) => {
  switch (action.type) {
    case SET_PROSERVICEUPDATE:
      return [...action.value];
    default: return state;
  }
}

export default updateproservices;