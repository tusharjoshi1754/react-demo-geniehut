/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_PRO_SERVICES_DETAILS, SET_PRO_SERVICES_DETAILS} from '../actions';
import {apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* ask to call */

export const watchGetProServicesDetails = function* () {
  yield takeEvery(GET_PRO_SERVICES_DETAILS, workerGetProServicesDetails);
}

function* workerGetProServicesDetails({ formPayload }) {
  try {      
    const result = yield call(getProServicesDetails, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_PRO_SERVICES_DETAILS, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getProServicesDetails(formPayload) {
   return Axios.post(apiUrl+'genpro/proDetails', formPayload);
}