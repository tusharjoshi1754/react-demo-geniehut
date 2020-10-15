/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_IPDATA, SET_IPDATA } from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetIpData = function* () {
  yield takeEvery(GET_IPDATA, workerGetIpData);
}

function* workerGetIpData({ ipaddress }) {
  try {
 const result = yield call(getIpData, ipaddress);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_IPDATA, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getIpData(ipaddress) {
       return Axios.post(apiUrl+'user/user_ipdetails', ipaddress);
} 
