/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_FORGETPASSWORD, SET_FORGETPASSWORD } from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetForgetPassword = function* () {
  yield takeEvery(GET_FORGETPASSWORD, workerGetForgetPassword);
}
function* workerGetForgetPassword({ formPayload }) {
  try {
 const result = yield call(getForgetPassword, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_FORGETPASSWORD, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getForgetPassword(formPayload) {
       return Axios.post(apiUrl+'user/user_forgot_password', formPayload);
} 
