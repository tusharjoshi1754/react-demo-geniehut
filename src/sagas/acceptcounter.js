/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_ACCEPTCOUNTER, SET_ACCEPTCOUNTER} from '../actions';
import {apiUrl } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetAcceptCounter = function* () {
  yield takeEvery(GET_ACCEPTCOUNTER, workerGetAcceptCounter);
}

function* workerGetAcceptCounter({ formPayload }) {
  try {      
    const result = yield call(getAcceptCounter, formPayload);
	  var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_ACCEPTCOUNTER, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getAcceptCounter(formPayload) {
    var qs = require('qs');
    return Axios.post(apiUrl+'genrun/jobaccept', qs.stringify(formPayload));
}