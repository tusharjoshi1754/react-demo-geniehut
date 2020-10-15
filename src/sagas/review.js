/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_REVIEW, SET_REVIEW } from '../actions';
import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetReview = function* () {
  yield takeEvery(GET_REVIEW, workerGetReview);
}

function* workerGetReview({formPayload}) {
  try {
    const result = yield call(getReview, formPayload);
    
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_REVIEW, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function getReview(formPayload) {
  const userID = '';
  if(formPayload.userID!=='' && typeof formPayload.userID!==undefined) {
    return Axios.get(apiUrl+'genrun/getReviews?app_name='+appName+'&UserToken='+cookie.load('UserAuthToken')+'&page='+formPayload.page+'&user_id='+formPayload.userID);
    
  }
  else {
  return Axios.get(apiUrl+'genrun/getReviews?app_name='+appName+'&UserToken='+cookie.load('UserAuthToken')+'&page='+formPayload.page);
  }
  
} 