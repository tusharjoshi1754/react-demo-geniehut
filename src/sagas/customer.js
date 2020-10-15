/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_RUNSEARCHLIST, SET_RUNSEARCHLIST, GET_RUNTRANSACTION, SET_RUNTRANSACTION, GET_SERVICES, SET_SERVICES, GET_PRETRANSACTION, SET_PRETRANSACTION, GET_CONTACTUS, SET_CONTACTUS, GET_SUBTITLE, SET_SUBTITLE } from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetRunSearchList = function* () {
  yield takeEvery(GET_RUNSEARCHLIST, workerGetRunSearchList);
}

function* workerGetRunSearchList({ formPayload }) {
  try {      
    const result = yield call(getRunSearchList, formPayload);
	  var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_RUNSEARCHLIST, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getRunSearchList(formPayload) {
   return Axios.post(apiUrl+'customer/getServiceSearchlist', formPayload);
}


/* genrun customerleads */

export const watchGetRunTransaction = function* () {
  yield takeEvery(GET_RUNTRANSACTION, workerGetRunTransaction);
}
function* workerGetRunTransaction({ UserToken, page, filter_status }) {
    try {
    const uri = apiUrl+'customer/custtransaction?app_name='+appName+'&user_token='+UserToken+'&page='+page+'&filter_status='+filter_status;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_RUNTRANSACTION, value: resultArr });
    } 
    catch {
      console.log('get data failed');
    }
} 


/* genrun customerleads */

export const watchGetServices = function* () {
  yield takeEvery(GET_SERVICES, workerGetServices);
}
function* workerGetServices({ type, page }) {
    try {
    const uri = apiUrl+'user/getService?app_name='+appName+'&type='+type+'&page='+page;
    const result = yield call(Axios.get, uri);
    console.log(result)
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_SERVICES, value: resultArr });
    } 
    catch {
      console.log('get data failed');
    }
} 


/* get prevoius transaction detail */

export const watchGetPreTransaction = function* () {
  yield takeEvery(GET_PRETRANSACTION, workerGetPreTransaction);
}
function* workerGetPreTransaction({ transId}) {
    try {
    const uri = apiUrl+'customer/getPretransdetail?app_name='+appName+'&transID='+transId;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_PRETRANSACTION, value: resultArr });
    } 
    catch {
      console.log('get data failed');
    }
} 


/* contact us for m submit */

export const watchGetContactus = function* () {
  yield takeEvery(GET_CONTACTUS, workerGetContactus);
}

function* workerGetContactus({ formPayload }) {
  try {      
    const result = yield call(getContactus, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_CONTACTUS, value: resultArr });
  } 
  catch {
    console.log('form submit failed');
  }
}
function getContactus(formPayload) {
   return Axios.post(apiUrl+'customer/contactus', formPayload);
}

/* get subtitle depends on services */

export const watchGetSubtitle = function* () {
  yield takeEvery(GET_SUBTITLE, workerGetSubtitle);
}
function* workerGetSubtitle({ service_id }) {
    try {
    const uri = apiUrl+'customer/getTransubtitle?app_name='+appName+'&service_id='+service_id;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_SUBTITLE, value: resultArr });
    } 
    catch {
      console.log('get data failed');
    }
} 
