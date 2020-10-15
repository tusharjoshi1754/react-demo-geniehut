/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_POINTS, SET_POINTS } from '../actions';

import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetPoints = function* () {
  yield takeEvery(GET_POINTS, workerGetPoints);
}

function* workerGetPoints() {
  try {
    const result = yield call(getPoints);    
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_POINTS, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function getPoints() {
  return Axios.get(apiUrl+'cms/pointsList');
} 