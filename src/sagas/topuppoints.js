/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_TOPUPPOINTS, SET_TOPUPPOINTS } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetTopupPoints= function* () {
  yield takeEvery(GET_TOPUPPOINTS, workerGetTopupPoints);
}
function* workerGetTopupPoints({ formPayload }) {
  try {
	const result = yield call(getTopupPointsData, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_TOPUPPOINTS, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getTopupPointsData(formPayload) {
   return Axios.post(apiUrl+'topuppromotion/submit_topup', formPayload);
} 


