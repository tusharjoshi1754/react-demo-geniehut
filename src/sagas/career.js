/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CAREERS, SET_CAREERS, GET_JOBAPPLIED, SET_JOBAPPLIED } from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetJobApplied = function* () {
  yield takeEvery(GET_JOBAPPLIED, workerGetJobApplied);
}
function* workerGetJobApplied({ formPayload, Config }) {
  try {
 const result = yield call(getJobApplied, formPayload, Config);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_JOBAPPLIED, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getJobApplied(formPayload,Config) {
       return Axios.post(apiUrl+'careers/apply_career_job', formPayload, Config);
} 


/* genrun customerleads */

export const watchGetCareers = function* () {
  yield takeEvery(GET_CAREERS, workerGetCareers);
}
function* workerGetCareers({ career_id }) {
    try {
    const uri = apiUrl+'careers/carrer_jobs?app_name='+appName+'&career_id='+career_id;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_CAREERS, value: resultArr });
    } 
    catch {
      console.log('get data failed');
    }
} 

