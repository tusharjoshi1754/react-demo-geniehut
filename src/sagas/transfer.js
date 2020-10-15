/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_TRANSFER, SET_TRANSFER } from '../actions';
import { apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetTransfer = function* () {
  yield takeEvery(GET_TRANSFER, workerGetTransfer);
}

function* workerGetTransfer({ parems }) {
  try {
    const result = yield call(getTransfer, parems);
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_TRANSFER, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function getTransfer(parems) {
    var qs = require('qs');
    return Axios.post(apiUrl+'user/points_transfer', qs.stringify(parems));
} 
