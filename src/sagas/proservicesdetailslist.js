/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_PRO_SERVICES_DETAILS_LIST, SET_PRO_SERVICES_DETAILS_LIST} from '../actions';
import {apiUrl } from "../components/Config/Config";
import Axios from 'axios';

/* ask to call */
export const watchGetProServicesDetailsList = function* () {
  yield takeEvery(GET_PRO_SERVICES_DETAILS_LIST, workerGetProServicesDetailsList);
}

function* workerGetProServicesDetailsList({ formPayload }) {
  try {      
    const result = yield call(getProServicesDetailsList, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_PRO_SERVICES_DETAILS_LIST, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getProServicesDetailsList(formPayload) {
   return Axios.post(apiUrl+'genpro/getProdetails', formPayload);
}