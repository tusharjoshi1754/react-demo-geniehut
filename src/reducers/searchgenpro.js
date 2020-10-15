import { SET_SEARCH_GEN_PRO } from '../actions';

const searchgenpro = (state = [], action) => {
  switch (action.type) {
    case SET_SEARCH_GEN_PRO:
      return [...action.value];
    default: return state;
  }
}

export default searchgenpro;
