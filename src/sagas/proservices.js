/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_PROSERVICES, SET_PROSERVICES,GET_ALLPROSERVICES, SET_ALLPROSERVICES } from '../actions';
import { apiUrl, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetProServices = function* () {
  yield takeEvery(GET_PROSERVICES, workerGetProServices);
}

function* workerGetProServices(params, page) {
  try {
    const result = yield call(GetProServices, params);    
    var resultArr = [];
	  resultArr.push(result.data);
    yield put({ type: SET_PROSERVICES, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function GetProServices(params) {
  let category = '';
  if(params.category!=='' && typeof params.category!=='undefined') {
    category="category_id="+params.category+"&page="+params.page+"";
  }else{
    category="page="+params.page+"";
  }
  return Axios.get(apiUrl+'user/listServices?app_name='+appName+'&addservice=genpro&'+category);
} 



export const watchGetAllProServices = function* () {
  yield takeEvery(GET_ALLPROSERVICES, workerGetAllProServices);
}

function* workerGetAllProServices() {
  try {
    const result = yield call(GetAllProServices);    
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_ALLPROSERVICES, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 

function GetAllProServices() {
  return Axios.get(apiUrl+'user/listallpro');
} 