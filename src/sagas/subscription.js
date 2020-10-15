/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_SUBSCRIPTIONDATA, SET_SUBSCRIPTIONDATA, GET_SERVICESUBSCRIPTION, SET_SERVICESUBSCRIPTION, GET_UPDATESUBSCRIPTION, SET_UPDATESUBSCRIPTION } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* get subscription details for pro users*/

export const watchGetSubscriptiondata = function* () {
  yield takeEvery(GET_SUBSCRIPTIONDATA, workerGetSubscriptiondata);
}

function* workerGetSubscriptiondata( { usertoken, serviceIds } ) {
  try {
    const uri = apiUrl+'prosubscription/prosubscription?app_name='+appName+'&UserToken='+usertoken+'&serviceid='+serviceIds;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_SUBSCRIPTIONDATA, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}

/* get subscription details for pro users by individual service id*/

export const watchGetServiceSubscription = function* () {
  yield takeEvery(GET_SERVICESUBSCRIPTION, workerGetServiceSubscription);
}

function* workerGetServiceSubscription( { serviceIds,usertoken } ) {
  try {
    const uri = apiUrl+'prosubscription/subscriptionbyId?app_name='+appName+'&UserToken='+usertoken+'&serviceid='+serviceIds;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_SERVICESUBSCRIPTION, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}

/* update subscription */

export const watchGetUpdateSubscription = function* () {
  yield takeEvery(GET_UPDATESUBSCRIPTION, workerGetUpdateSubscription);
}
function* workerGetUpdateSubscription({ formPayload }) {
  try {
  const result = yield call(getUpdateSubscription, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_UPDATESUBSCRIPTION, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getUpdateSubscription(formPayload) {
       return Axios.post(apiUrl+'prosubscription/updatesubscription', formPayload);
} 