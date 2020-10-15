import { SET_ALLCOUNTRIES } from '../actions';

const allcountries = (state = [], action) => {
  switch (action.type) {
    case SET_ALLCOUNTRIES:
      return [...action.value];
    default: return state;
  }
}

export default allcountries;
