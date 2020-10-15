/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_DISTRICT, SET_DISTRICT } from '../actions';

import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetDistrict = function* () {
  yield takeEvery(GET_DISTRICT, workerGetDistrict);
}

function* workerGetDistrict({}) {
  try {
    const result = yield call(getDistrict);
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_DISTRICT, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function getDistrict() {
    return Axios.get(apiUrl+'user/getDistrict?app_name='+appName);
} 
