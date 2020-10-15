/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_COMPARE_LIST, SET_COMPARE_LIST} from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetCompareList = function* () {
  yield takeEvery(GET_COMPARE_LIST, workerGetCompareList);
}

function* workerGetCompareList({ formPayload }) {
  try {      
    const result = yield call(getCompareList, formPayload);
	  var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_COMPARE_LIST, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getCompareList(formPayload) {
   return Axios.post(apiUrl+'genpro/proComparelist', formPayload);
}
