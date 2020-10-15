/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_PRODASHBOARD, SET_PRODASHBOARD,GET_GENERALDASHBOARD ,SET_GENERALDASHBOARD } from '../actions';
import { apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* getPro details for dashboard */

export const watchGetProDashboard = function* () {
  yield takeEvery(GET_PRODASHBOARD, workerGetProDashboard);
}

function* workerGetProDashboard({usertoken}) {
  try {
    const uri = apiUrl+'dashboard/prodashboard?app_name='+appName+'&user_token='+usertoken;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_PRODASHBOARD, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
} 

/* getPro details for dashboard */

export const watchGetGeneralDashboard = function* () {
  yield takeEvery(GET_GENERALDASHBOARD, workerGetGeneralDashboard);
}

function* workerGetGeneralDashboard({usertoken}) {
  try {
    const uri = apiUrl+'dashboard/generaldashboard?app_name='+appName+'&user_token='+usertoken;
    console.log(uri)
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_GENERALDASHBOARD, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
} 