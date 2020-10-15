import { SET_COUNTERLIST } from '../actions';

const counterlist = (state = [], action) => {
  switch (action.type) {
    case SET_COUNTERLIST:
      return [...action.value];
    default: return state;
  }
}
export default counterlist;