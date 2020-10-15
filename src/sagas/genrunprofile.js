/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_GENRUNPROFILE, SET_GENRUNPROFILE } from '../actions';

import { apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* genrun profile update */
export const watchGetGenrunProfile = function* () {
  yield takeEvery(GET_GENRUNPROFILE, workerGetGenrunProfile);
}
function* workerGetGenrunProfile({ formPayload }) {
  console.log(formPayload)
  try {
  const result = yield call(getGenrunProfile, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_GENRUNPROFILE, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getGenrunProfile(formPayload) {
       return Axios.post(apiUrl+'user/updategenrun', formPayload);
} 