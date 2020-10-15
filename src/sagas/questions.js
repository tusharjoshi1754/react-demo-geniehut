/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_QUESTIONS, SET_QUESTIONS } from '../actions';
import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetQuestions = function* () {
  yield takeEvery(GET_QUESTIONS, workerGetQuestions);
}

function* workerGetQuestions(params) {
  try {
    const result = yield call(GetQuestions, params);    
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_QUESTIONS, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function GetQuestions(params) {
  if(params.serviceID!='') {
    return Axios.get(apiUrl+'user/questions?app_name='+appName+'&service_id='+params.serviceID);
  }  
} 