/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_MOBILE_COUNTRY, SET_MOBILE_COUNTRY } from '../actions';

import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetMobileCountry = function* () {
  yield takeEvery(GET_MOBILE_COUNTRY, workerGetMobileCountry);
}

function* workerGetMobileCountry() {
  try {
    const result = yield call(getMobileCountry);    
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_MOBILE_COUNTRY, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function getMobileCountry() {
  return Axios.get(apiUrl+'cms/mobileCountries');
} 