/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_SEND_MESSAGE, SET_SEND_MESSAGE} from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* ask to call */

export const watchGetSendMessage = function* () {
  yield takeEvery(GET_SEND_MESSAGE, workerGetSendMessage);
}

function* workerGetSendMessage({ formPayload }) {
  try {      
    const result = yield call(getSendMessage, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_SEND_MESSAGE, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getSendMessage(formPayload) {
  console.log('REquest', formPayload);
   return Axios.post(apiUrl+'follow/sendNotify', formPayload);
}