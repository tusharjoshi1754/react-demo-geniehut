/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_APPLYPROMOTION, SET_APPLYPROMOTION, GET_SUBMITPOINTSYSTEM, SET_SUBMITPOINTSYSTEM, GET_TRANSACTIONDETAILS, SET_TRANSACTIONDETAILS } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetApplyPromotion = function* () {
  yield takeEvery(GET_APPLYPROMOTION, workerGetApplyPromotion);
}
function* workerGetApplyPromotion({ formPayload }) {
  try {
	const result = yield call(getApplyPromotionData, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_APPLYPROMOTION, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getApplyPromotionData(formPayload) {
   return Axios.post(apiUrl+'topuppromotion/apply_promotion', formPayload);
} 


/* for after submit points insert into points system */

export const watchGetSubmitPointsystem = function* () {
  yield takeEvery(GET_SUBMITPOINTSYSTEM, workerGetSubmitPointsystem);
}
function* workerGetSubmitPointsystem({ formPayload }) {
  try {
  const result = yield call(getSubmitPointsystem, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_SUBMITPOINTSYSTEM, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getSubmitPointsystem(formPayload) {
  return Axios.post(apiUrl+'topuppromotion/submit_points_system', formPayload);
} 

/* get transaction details for users*/

export const watchGetTransactiondetails = function* () {
  yield takeEvery(GET_TRANSACTIONDETAILS, workerGetTransactiondetails);
}

function* workerGetTransactiondetails( { transactionid } ) {
  try {
    const uri = apiUrl+'topuppromotion/transcation_details?app_name='+appName+'&transcation_primary_id='+transactionid;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_TRANSACTIONDETAILS, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}