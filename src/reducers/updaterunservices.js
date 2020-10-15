import { SET_RUNSERVICEUPDATE } from '../actions';

const updaterunservices = (state = [], action) => {
  switch (action.type) {
    case SET_RUNSERVICEUPDATE:
      return [...action.value];
    default: return state;
  }
}

export default updaterunservices;