/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_OTP, SET_OTP } from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetOtpData = function* () {
  yield takeEvery(GET_OTP, workerGetOtpData);
}
function* workerGetOtpData({ formPayload }) {
  try {
 const result = yield call(getOtpData, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_OTP, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getOtpData(formPayload) {
       return Axios.post(apiUrl+'user/user_otp_verification', formPayload);
} 
