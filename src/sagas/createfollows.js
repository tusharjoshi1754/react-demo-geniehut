/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_CREATE_FOLLOW, SET_CREATE_FOLLOW } from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* ask to call */

export const watchGetCreateFollows = function* () {
  yield takeEvery(GET_CREATE_FOLLOW, workerGetCreateFollows);
}

function* workerGetCreateFollows({ formPayload }) {
  try {      
    const result = yield call(getCreateFollows, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_CREATE_FOLLOW, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getCreateFollows(formPayload) {
  console.log(formPayload);
   return Axios.post(apiUrl+'follow/addFollow', formPayload);
}
