/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_COUNTERLIST, SET_COUNTERLIST } from '../actions';

import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetCounterList = function* () {
  yield takeEvery(GET_COUNTERLIST, workerGetCounterList);
}

function* workerGetCounterList({trans_id}) {
  try {
    
    const result = yield call(getCounterList, trans_id);
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_COUNTERLIST, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 

function getCounterList(trans_id) {
    return Axios.get(apiUrl+'genrun/usercounterlist?app_name='+appName+'&user_token='+cookie.load('UserAuthToken')+'&trans_id='+trans_id);
}