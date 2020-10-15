import { SET_CHANGE_JOB_STATUS } from "../actions";

const changejobstatus = (state = [], action) => {
  switch (action.type) {
    case SET_CHANGE_JOB_STATUS:
      return [...action.value];
    default:
      return state;
  }
};

export default changejobstatus;
