/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CHANGEPASSWORD, SET_CHANGEPASSWORD } from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetChangePassword = function* () {
  yield takeEvery(GET_CHANGEPASSWORD, workerGetChangePassword);
}
function* workerGetChangePassword({ formPayload }) {
  try {
 const result = yield call(getChangePassword, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_CHANGEPASSWORD, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getChangePassword(formPayload) {
       return Axios.post(apiUrl+'user/user_change_password', formPayload);
} 
