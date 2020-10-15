/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_GEN_MESSAGE, SET_GEN_MESSAGE } from '../actions';
import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetGenMessage = function* () {
  yield takeEvery(GET_GEN_MESSAGE, workerGetGenMessage);
}

function* workerGetGenMessage({call_id, chattype}) {
  try {    
    const result = yield call(getGenMessage, call_id, chattype);
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_GEN_MESSAGE, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 

function getGenMessage(param, chattype) {
    return Axios.get(apiUrl+'genmessage/getMessage?call_id='+param+'&chattype='+chattype);
}