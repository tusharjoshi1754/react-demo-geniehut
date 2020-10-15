/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_ASKTOCALL, SET_ASKTOCALL, GET_CALLREQUEST, SET_CALLREQUEST, GET_AVAILTRANSACTION, SET_AVAILTRANSACTION} from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* ask to call */

export const watchGetAsktocall = function* () {
  yield takeEvery(GET_ASKTOCALL, workerGetAsktocall);
}

function* workerGetAsktocall({ formPayload }) {
  try {      
    const result = yield call(getAsktocall, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_ASKTOCALL, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getAsktocall(formPayload) {
  console.log('REquest', formPayload);
   return Axios.post(apiUrl+'genrun/asktocall', formPayload);
}


/* genrun customerleads */

export const watchGetCallRequest = function* () {
  yield takeEvery(GET_CALLREQUEST, workerGetCallRequest);
}
function* workerGetCallRequest({ UserToken, trans_id, service_id }) {
    try {
    const uri = apiUrl+'customer/getCallrequest?app_name='+appName+'&UserToken='+UserToken+'&trans_id='+trans_id+'&service_id='+service_id;
    console.log(uri)
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_CALLREQUEST, value: resultArr });
    } 
    catch {
      console.log('get data failed');
    }
} 


/* genrun customerleads */

export const watchGetAvailTransaction = function* () {
  yield takeEvery(GET_AVAILTRANSACTION, workerGetAvailTransaction);
}
function* workerGetAvailTransaction({ UserToken, trans_id, service_id }) {
    try {
    const uri = apiUrl+'customer/genrunServiceList?app_name='+appName+'&UserToken='+UserToken+'&trans_id='+trans_id+'&service_id='+service_id;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_AVAILTRANSACTION, value: resultArr });
    } 
    catch {
      console.log('get data failed');
    }
} 
