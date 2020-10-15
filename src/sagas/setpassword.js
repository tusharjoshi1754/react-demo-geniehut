/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_SETPASSWORD, SET_SETPASSWORD } from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetSetPassword = function* () {
  yield takeEvery(GET_SETPASSWORD, workerGetSetPassword);
}
function* workerGetSetPassword({ formPayload }) {
  try {
 const result = yield call(getSetPassword, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_SETPASSWORD, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getSetPassword(formPayload) {
       return Axios.post(apiUrl+'user/set_password', formPayload);
} 
