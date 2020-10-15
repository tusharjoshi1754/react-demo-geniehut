/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CUSTOMERLEADS, SET_CUSTOMERLEADS, GET_JOBCONFIRMREQUEST, SET_JOBCONFIRMREQUEST, GET_PROJOBS , SET_PROJOBS,GET_LEADINFO, SET_LEADINFO, GET_SAVEQUOTATION, SET_SAVEQUOTATION, GET_RUNCUSTOMERLEADS, SET_RUNCUSTOMERLEADS, GET_RUNDETAILCUSTOMERLEADS, SET_RUNDETAILCUSTOMERLEADS } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* get customer leads details for users*/

export const watchGetCustomerLeads = function* () {
  yield takeEvery(GET_CUSTOMERLEADS, workerGetCustomerLeads);
}

function* workerGetCustomerLeads( { UserToken } ) {
  try {
    const uri = apiUrl+'customerleads/procustomerleads?app_name='+appName+'&UserToken='+UserToken;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_CUSTOMERLEADS, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}


/* change job status ( confirm or Rejected by pro users) */


export const watchGetJobconfirmRequest = function* () {
  yield takeEvery(GET_JOBCONFIRMREQUEST, workerGetJobconfirmRequest);
}
function* workerGetJobconfirmRequest({ formPayload }) {
  try {
  const result = yield call(getJobconfirmRequest, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_JOBCONFIRMREQUEST, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getJobconfirmRequest(formPayload) {
   return Axios.post(apiUrl+'customerleads/confirm_request', formPayload);
} 


/* get All pro jobs*/

export const watchGetProJobs = function* () {
  yield takeEvery(GET_PROJOBS, workerGetProJobs);
}

function* workerGetProJobs( { UserToken, sorttype } ) {
  try {
      const uri = apiUrl+'customerleads/projobs?app_name='+appName+'&UserToken='+UserToken+'&sorttype='+sorttype;
      console.log(uri)
      const result = yield call(Axios.get, uri);
      var resultArr = [];
      resultArr.push(result.data);
      yield put({ type: SET_PROJOBS, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}


/* get Lead jobs*/

export const watchGetLeadJobs = function* () {
  yield takeEvery(GET_LEADINFO, workerGetLeadJobs);
}

function* workerGetLeadJobs( { UserToken, jobID} ) {
  try {
      const uri = apiUrl+'customerleads/lead_info?app_name='+appName+'&UserToken='+UserToken+'&jobID='+jobID;
      const result = yield call(Axios.get, uri);
      var resultArr = [];
      resultArr.push(result.data);
      yield put({ type: SET_LEADINFO, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}

/* save quotation */

export const watchGetSaveQuotation = function* () {
  yield takeEvery(GET_SAVEQUOTATION, workerGetSaveQuotation);
}
function* workerGetSaveQuotation({ formPayload }) {
  try {
  const result = yield call(getSaveQuotation, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_SAVEQUOTATION, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getSaveQuotation(formPayload) {
   return Axios.post(apiUrl+'customerleads/savequotation', formPayload);
} 


/* genrun customerleads */


export const watchGetRunCustomerleads = function* () {
  yield takeEvery(GET_RUNCUSTOMERLEADS, workerGetRunCustomerleads);
}

function* workerGetRunCustomerleads({ formPayload }) {
  try {
  const result = yield call(getRunCustomerleads, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_RUNCUSTOMERLEADS, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getRunCustomerleads(formPayload) {
   return Axios.post(apiUrl+'customerleads/runcustomerleads', formPayload);
} 


/* genrun customerleads */

export const watchGetRunDetailCustomerleads = function* () {
  yield takeEvery(GET_RUNDETAILCUSTOMERLEADS, workerGetRunDetailCustomerleads);
}
function* workerGetRunDetailCustomerleads({ UserToken, trans_id }) {
    try {
    const uri = apiUrl+'customerleads/runcustomerleadDetails?app_name='+appName+'&UserToken='+UserToken+'&trans_id='+trans_id;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_RUNDETAILCUSTOMERLEADS, value: resultArr });
    } 
    catch {
      console.log('get data failed');
    }
} 
