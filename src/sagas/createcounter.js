/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CREATECOUNTER, SET_CREATECOUNTER} from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetCreateCounter = function* () {
  yield takeEvery(GET_CREATECOUNTER, workerGetCreateCounter);
}

function* workerGetCreateCounter({ formPayload }) {
  console.log(formPayload);
  try {      
    const result = yield call(getCreateCounter, formPayload);
	  var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_CREATECOUNTER, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getCreateCounter(formPayload) {
    var qs = require('qs');
    return Axios.post(apiUrl+'genrun/genrun_counteroff', qs.stringify(formPayload));
}