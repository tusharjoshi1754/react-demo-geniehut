/* eslint-disable */
const qs = require("qs")
import {
  takeEvery,
  call,
  put
} from 'redux-saga/effects';
import {
  GET_REGISTRATION,
  SET_REGISTRATION
} from '../actions';
import {
  apiUrl,
  deliveryId
} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetRegistration = function* () {
  yield takeEvery(GET_REGISTRATION, workerGetRegistration);
}

function* workerGetRegistration({
  formPayload
}) {
  try {
    
    console.log("from_pay:", qs.parse(formPayload))
    const result = yield call(getRegistration, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({
      type: SET_REGISTRATION,
      value: resultArr
    });
  } catch (error) {
    console.log('error', error)
    console.log('login failed');
  }
}


function getRegistration(formPayload) {
  console.log("my-demo:", JSON.parse(formPayload))
  const demo = Axios.post(apiUrl + 'user/user_register', formPayload);
  console.log(demo)
  return Axios.post(apiUrl + 'user/user_register', formPayload);
}