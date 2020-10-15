/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CUSTOMER_TRANS_DETAILS, SET_CUSTOMER_TRANS_DETAILS } from '../actions';

import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetCustomerTransDetails = function* () {
  yield takeEvery(GET_CUSTOMER_TRANS_DETAILS, workerGetCustomerTrans);
}

function* workerGetCustomerTrans({formPayload}) {
  try {
    const result = yield call(getCustomerTrans, formPayload);
    
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_CUSTOMER_TRANS_DETAILS, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function getCustomerTrans(formPayload) {
  
  return Axios.get(apiUrl+'customer/genruntransactiondetail?app_name='+appName+'&UserToken='+cookie.load('UserAuthToken')+'&trans_id='+formPayload.transID+'&genrun_id='+formPayload.userID);
} 