/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_PRO_QUESTIONS, SET_PRO_QUESTIONS } from '../actions';
import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetProQuestions = function* () {
  yield takeEvery(GET_PRO_QUESTIONS, workerGetProQuestions);
}

function* workerGetProQuestions(params) {
  try {
    const result = yield call(GetProQuestions, params);    
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_PRO_QUESTIONS, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function GetProQuestions(params) {
  console.log(params);
    return Axios.get(apiUrl+'genpro/proQuestion?'+params.params);
} 