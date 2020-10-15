/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_LOGINDATA, SET_LOGINDATA, GET_UNSETTOKEN, SET_UNSETTOKEN } from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetLoginData = function* () {
  yield takeEvery(GET_LOGINDATA, workerGetLoginData);
}

function* workerGetLoginData({ formPayload }) {
  try {
      
 const result = yield call(getLoginData, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_LOGINDATA, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function getLoginData(formPayload) {
      return Axios.post(apiUrl+'user/user_login', formPayload);
} 

/* logout */

export const watchGetUnsetToken = function* () {
  yield takeEvery(GET_UNSETTOKEN, workerGetUnsetToken);
}

function* workerGetUnsetToken({ formPayload }) {
  try {
 const result = yield call(getUnsetToken, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_UNSETTOKEN, value: resultArr });
  } 
  catch {
    console.log('logout failed');
  }
} 


function getUnsetToken(formPayload) {
       return Axios.post(apiUrl+'user/user_logout', formPayload);
}