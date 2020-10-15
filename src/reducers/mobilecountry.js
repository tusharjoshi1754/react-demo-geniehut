import { SET_MOBILE_COUNTRY } from '../actions';

const mobilecountry = (state = [], action) => {
  switch (action.type) {
    case SET_MOBILE_COUNTRY:
      return [...action.value];
    default: return state;
  }
}

export default mobilecountry;
