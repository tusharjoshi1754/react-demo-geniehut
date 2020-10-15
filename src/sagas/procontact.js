/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CONTACT, SET_CONTACT} from '../actions';
import {apiUrl } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetProContact = function* () {
  yield takeEvery(GET_CONTACT, workerGetProContact);
}

function* workerGetProContact({ formPayload }) {
  try {      
    const result = yield call(getProContact, formPayload);
	  var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_CONTACT, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
}
function getProContact(formPayload) {
    var qs = require('qs');
    return Axios.post(apiUrl+'genpro/contactPro', qs.stringify(formPayload));
}