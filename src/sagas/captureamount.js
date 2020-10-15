/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CAPTUREAMOUNT, SET_CAPTUREAMOUNT } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetCaptureAmount = function* () {
  yield takeEvery(GET_CAPTUREAMOUNT, workerGetCaptureAmount);
}
function* workerGetCaptureAmount({ formPayload }) {
  try {
	const result = yield call(getCaptureAmountData, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_CAPTUREAMOUNT, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getCaptureAmountData(formPayload) {
   return Axios.post(apiUrl+'payment/captureAmount', formPayload);
} 


