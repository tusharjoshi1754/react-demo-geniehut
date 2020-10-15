import { SET_RUNSEARCHLIST } from '../actions';

const runsearchlist = (state = [], action) => {
  switch (action.type) {
    case SET_RUNSEARCHLIST:
      return [...action.value];
    default: return state;
  }
}

export default runsearchlist;
