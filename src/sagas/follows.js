/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_FOLLOW, SET_FOLLOW, GET_ALLCOUNTRIES, SET_ALLCOUNTRIES } from '../actions';

import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetFollows = function* () {
  yield takeEvery(GET_FOLLOW, workerGetFollows);
}

function* workerGetFollows({params}) {
  try {
    
    const result = yield call(getFollows, params);
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_FOLLOW, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 

function getFollows(params) {
    return Axios.get(apiUrl+'follow/following?user_token='+cookie.load('UserAuthToken')+'&'+params);
}


/*get all countries */
export const watchGetAllCounties = function* () {
  yield takeEvery(GET_ALLCOUNTRIES, workerGetAllCounties);
}

function* workerGetAllCounties() {
  try {
    const uri = apiUrl+'user/getAllcountries';
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_ALLCOUNTRIES, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
} 