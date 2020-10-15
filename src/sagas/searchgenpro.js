/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_SEARCH_GEN_PRO, SET_SEARCH_GEN_PRO, GET_GENPROCALLREQUEST, SET_GENPROCALLREQUEST,GET_FILTER_GEN_PRO,SET_FILTER_GEN_PRO} from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* ask to call */

export const watchGetSearchGenPro = function* () {
  yield takeEvery(GET_SEARCH_GEN_PRO, workerGetSearchGenPro);
}

function* workerGetSearchGenPro({ formPayload }) {
  try {      
    const result = yield call(getSearchGenPro, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_SEARCH_GEN_PRO, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getSearchGenPro(formPayload) {
  var qs = require('qs');
  //return Axios.post(apiUrl+'genpro/searchgenpro', qs.stringify(formPayload));
}

/* get prolist callrequest data */

export const watchGetGenproCallRequest = function* () {
  yield takeEvery(GET_GENPROCALLREQUEST, workerGetGenproCallRequest);
}

function* workerGetGenproCallRequest( { qcsd_id } ) {
  try {
    const uri = apiUrl+'genpro/getprocallrequest?app_name='+appName+'&qcsd_id='+qcsd_id;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
      yield put({ type: SET_GENPROCALLREQUEST, value: resultArr });
    } 
  catch {
    console.log('Get Page Failed');
  }
}


/* get prolist filter */

export const watchGetFilterGenPro = function* () {
  yield takeEvery(GET_FILTER_GEN_PRO, workerGetFilterGenPro);
}

function* workerGetFilterGenPro({ formPayload }) {
  try {
  const result = yield call(getFilterGenPro, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_FILTER_GEN_PRO, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getFilterGenPro(formPayload) {
   return Axios.post(apiUrl+'genpro/getfiltergenpro', formPayload);
} 