/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_USERWALLETINFO, SET_USERWALLETINFO } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetUserwalletInfo= function* () {
  yield takeEvery(GET_USERWALLETINFO, workerGetUserwalletInfo);
}
function* workerGetUserwalletInfo({ formPayload }) {
  try {
	const result = yield call(getUserwalletInfo, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_USERWALLETINFO, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getUserwalletInfo(formPayload) {
   return Axios.post(apiUrl+'user/userwalletinfo', formPayload);
} 


