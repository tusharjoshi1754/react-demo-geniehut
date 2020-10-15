/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_STRIPONTOKEN, SET_STRIPONTOKEN } from '../actions';
import {apiUrl} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetStriponToken = function* () {
  yield takeEvery(GET_STRIPONTOKEN, workerGetStriponToken);
}
function* workerGetStriponToken({ formPayload }) {
  try {
	const result = yield call(getStriponTokenData, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_STRIPONTOKEN, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getStriponTokenData(formPayload) {
   return Axios.post(apiUrl+'payment/stripeTokenPay', formPayload);
} 


