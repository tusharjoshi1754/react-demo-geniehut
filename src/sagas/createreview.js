/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CREATE_REVIEW, SET_CREATE_REVIEW} from '../actions';
import {apiUrl, deliveryId } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetCreateReview = function* () {
  yield takeEvery(GET_CREATE_REVIEW, workerGetCreateReview);
}

function* workerGetCreateReview({ formPayload }) {
  console.log(formPayload);
  try {      
    const result = yield call(getCreateReview, formPayload);
	  var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_CREATE_REVIEW, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getCreateReview(formPayload) {
    var qs = require('qs');
    return Axios.post(apiUrl+'genrun/writeReview', qs.stringify(formPayload));
}