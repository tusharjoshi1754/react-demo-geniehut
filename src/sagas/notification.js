/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_ALLNOTIFICATION, SET_ALLNOTIFICATION, GET_DELETENOTIFICATION, SET_DELETENOTIFICATION, GET_READNOTIFY, SET_READNOTIFY, GET_HEADERNOTIFICATION, SET_HEADERNOTIFICATION } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

/* get notification details for all users*/

export const watchGetAllNotification = function* () {
  yield takeEvery(GET_ALLNOTIFICATION, workerGetAllNotification);
}

function* workerGetAllNotification( { usertoken, page } ) {
  try {
    const uri = apiUrl+'notification/notification?app_name='+appName+'&userToken='+usertoken+'&page='+page;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_ALLNOTIFICATION, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}


/* get notification details for all users*/

export const watchGetHeaderNotification = function* () {
  yield takeEvery(GET_HEADERNOTIFICATION, workerGetHeaderNotification);
}

function* workerGetHeaderNotification( { usertoken, page } ) {
  try {
    const uri = apiUrl+'notification/notification?app_name='+appName+'&userToken='+usertoken+'&page='+page;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_HEADERNOTIFICATION, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}


/* Delet All notification*/

export const watchGetDeleteNotification = function* () {
  yield takeEvery(GET_DELETENOTIFICATION, workerGetDeleteNotification);
}

function* workerGetDeleteNotification( { usertoken, notifyId } ) {
  try {
    const uri = apiUrl+'notification/deletenotify?app_name='+appName+'&userToken='+usertoken+'&notifyId='+notifyId;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_DELETENOTIFICATION, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}

/* Read notification */

export const watchGetReadNotify = function* () {
  yield takeEvery(GET_READNOTIFY, workerGetReadNotify);
}

function* workerGetReadNotify( { usertoken, notifyId } ) {
  try {
    const uri = apiUrl+'notification/readnotify?app_name='+appName+'&userToken='+usertoken+'&notifyId='+notifyId;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_READNOTIFY, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}