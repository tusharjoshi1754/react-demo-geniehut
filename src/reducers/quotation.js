import { SET_QUOTATION } from "../actions";

const quotation = (state = [], action) => {
  switch (action.type) {
    case SET_QUOTATION:
      return [...action.value];
    default:
      return state;
  }
};

export default quotation;
