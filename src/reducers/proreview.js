import { SET_WRITE_PRO_REVIEW } from "../actions";

const proreview = (state = [], action) => {
  switch (action.type) {
    case SET_WRITE_PRO_REVIEW:
      return [...action.value];
    default:
      return state;
  }
};

export default proreview;
