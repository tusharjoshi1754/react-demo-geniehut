/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_CREATE_MESSAGE, SET_CREATE_MESSAGE} from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';

export const watchGetCreateMessage = function* () {
  yield takeEvery(GET_CREATE_MESSAGE, workerGetCreateMessage);
}

function* workerGetCreateMessage({ formPayload }) {
  try {      
    const result = yield call(getCreateMessage, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_CREATE_MESSAGE, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getCreateMessage(formPayload) {
    var qs = require('qs');
    return Axios.post(apiUrl+'genmessage/createGenMessage', qs.stringify(formPayload));
}