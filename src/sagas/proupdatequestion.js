/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_UPDATE_PRO_QUESTIONS, SET_UPDATE_PRO_QUESTIONS} from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* ask to call */

export const watchGetProUpdateQuestions = function* () {
  yield takeEvery(GET_UPDATE_PRO_QUESTIONS, workerGetProUpdateQuestions);
}

function* workerGetProUpdateQuestions({ formPayload }) {
  try {      
    const result = yield call(getProUpdateQuestions, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_UPDATE_PRO_QUESTIONS, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getProUpdateQuestions(formPayload) {
  var qs = require('qs');
   //return Axios.post(apiUrl+'genpro/updateProquestions', qs.stringify(formPayload));
}
