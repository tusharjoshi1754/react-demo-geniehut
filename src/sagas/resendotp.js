/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_RESENDOTP, SET_RESENDOTP } from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetResendotpData = function* () {
  yield takeEvery(GET_RESENDOTP, workerGetResendotpData);
}

function* workerGetResendotpData({ formPayload }) {
  try {
 const result = yield call(getResendotpData, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_RESENDOTP, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getResendotpData(formPayload) {
       return Axios.post(apiUrl+'user/user_resend_otp', formPayload);
} 
