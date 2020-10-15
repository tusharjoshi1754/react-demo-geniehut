/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CATEGORIES, SET_CATEGORIES } from '../actions';
import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetCategories = function* () {
  yield takeEvery(GET_CATEGORIES, workerGetCategories);
}

function* workerGetCategories() {
  try {
    const result = yield call(GetCategories);    
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_CATEGORIES, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function GetCategories() {
  return Axios.get(apiUrl+'user/listProCategory?app_name='+appName);
} 