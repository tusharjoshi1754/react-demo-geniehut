/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_TOPUPPLAN, SET_TOPUPPLAN, GET_SHAREADDPOINT, SET_SHAREADDPOINT } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetTopupPlan = function* () {
  yield takeEvery(GET_TOPUPPLAN, workerGetTopupPlan);
}
function* workerGetTopupPlan() {
  try {
    const uri = apiUrl+'topuppromotion/topup_list?app_name='+appName;
    const result = yield call(Axios.get, uri);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_TOPUPPLAN, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 

export const watchGetShareAddpoint = function* () {
  yield takeEvery(GET_SHAREADDPOINT, workerGetShareAddpoint);
}
function* workerGetShareAddpoint({ url_key}) {
  try {
    const uri = apiUrl+'topuppromotion/Urlshareoints?app_name='+appName+'&url_key='+url_key;
    console.log(uri)
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_SHAREADDPOINT, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 
