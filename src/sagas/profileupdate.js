/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_GENERALPROFILE, SET_GENERALPROFILE, GET_IMAGEPROFILE, SET_IMAGEPROFILE, GET_GENRUNPROFILE, SET_GENRUNPROFILE, GET_REQUESTSERVICE,SET_REQUESTSERVICE, GET_SELECTRUNSERVICE, SET_SELECTRUNSERVICE, GET_GENPROPROFILE, SET_GENPROPROFILE, GET_ENABLETYPE, SET_ENABLETYPE,GET_PROUSERDETAILS,SET_PROUSERDETAILS, GET_PROSERVICEUPDATE, SET_PROSERVICEUPDATE, GET_USERPROFILE, SET_USERPROFILE, GET_POSTALADDRESS, SET_POSTALADDRESS, GET_RUNUSERDETAILS, SET_RUNUSERDETAILS, GET_RUNSERVICEUPDATE, SET_RUNSERVICEUPDATE, GET_MOBILEUPDATE, SET_MOBILEUPDATE, GET_CHANGEMOBILE, SET_CHANGEMOBILE, GET_RUNSERVICEACTION, SET_RUNSERVICEACTION } from '../actions';

import { apiUrl, deliveryId, appName } from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';

export const watchGetGeneralProfile = function* () {
  yield takeEvery(GET_GENERALPROFILE, workerGetGeneralProfile);
}

function* workerGetGeneralProfile({ formPayload }) {
  try {
  const result = yield call(getGeneralProfile, formPayload);
	var resultArr = [];
	resultArr.push(result.data);
    yield put({ type: SET_GENERALPROFILE, value: resultArr });
  } 
  catch {
    console.log('login failed');
  }
} 


function getGeneralProfile(formPayload) {
       return Axios.post(apiUrl+'user/generalinfo_update', formPayload);
} 



/* file upload */
export const watchGetImageProfile = function* () {
  yield takeEvery(GET_IMAGEPROFILE, workerGetImageProfile);
}
function* workerGetImageProfile({ formPayload, Config }) {
  try {
 const result = yield call(getImageProfile, formPayload, Config);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_IMAGEPROFILE, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getImageProfile(formPayload,Config) {
       return Axios.post(apiUrl+'user/profileImageUpload', formPayload, Config);
} 


/* genrun profile update */
export const watchGetGenrunProfile = function* () {
  yield takeEvery(GET_GENRUNPROFILE, workerGetGenrunProfile);
}
function* workerGetGenrunProfile({ formPayload }) {
  try {
  const result = yield call(getGenrunProfile, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_GENRUNPROFILE, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getGenrunProfile(formPayload) {
       return Axios.post(apiUrl+'user/updategenrun', formPayload);
} 


/* get services list for profile update */

export const watchGetRequestService = function* () {
  yield takeEvery(GET_REQUESTSERVICE, workerGetRequestService);
}

function* workerGetRequestService({addservice, usertoken, page}) {
  try {
    const uri = apiUrl+'user/listServices?app_name='+appName+'&addservice='+addservice+'&usertoken='+usertoken+'&page='+page;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_REQUESTSERVICE, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
} 


/* get selected services list for genrun profile update */

export const watchGetSelectrunservice = function* () {
  yield takeEvery(GET_SELECTRUNSERVICE, workerGetSelectrunservice);
}

function* workerGetSelectrunservice( {usertoken,usertype} ) {
  try {
    const uri = apiUrl+'user/selectedvalue?app_name='+appName+'&user_token='+usertoken+'&user_type='+usertype;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_SELECTRUNSERVICE, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
} 


/* genpro profile update */
export const watchGetGenproProfile = function* () {
  yield takeEvery(GET_GENPROPROFILE, workerGetGenproProfile);
}
function* workerGetGenproProfile({ formPayload }) {
  try {
  const result = yield call(getGenproProfile, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_GENPROPROFILE, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getGenproProfile(formPayload) {
     return Axios.post(apiUrl+'user/updategenpro', formPayload);
} 

/* enable the user type */
export const watchGetEnableType = function* () {
  yield takeEvery(GET_ENABLETYPE, workerGetEnableType);
}
function* workerGetEnableType({ formPayload }) {
  try {
  const result = yield call(getEnableType, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_ENABLETYPE, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 


function getEnableType(formPayload) {
     return Axios.post(apiUrl+'user/update_assign_type', formPayload);
} 

/* get genpro profile details */

export const watchGetProUserDetails = function* () {
  yield takeEvery(GET_PROUSERDETAILS, workerGetProUserDetails);
}

function* workerGetProUserDetails( {usertoken} ) {
  try {
    const uri = apiUrl+'user/getProuserdetails?app_name='+appName+'&user_token='+usertoken;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_PROUSERDETAILS, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}


/* get genrun profile update */

export const watchGetRunUserDetails = function* () {
  yield takeEvery(GET_RUNUSERDETAILS, workerGetRunUserDetails);
}

function* workerGetRunUserDetails( {usertoken} ) {
  try {
    const uri = apiUrl+'user/Runuserdetails?app_name='+appName+'&user_token='+usertoken;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_RUNUSERDETAILS, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}

/* update the pro services */

export const watchGetProServiceUpdate = function* () {
  yield takeEvery(GET_PROSERVICEUPDATE, workerGetProServiceUpdate);
}
function* workerGetProServiceUpdate({ formPayload }) {
  try {
  const result = yield call(getProServiceUpdate, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_PROSERVICEUPDATE, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 

function getProServiceUpdate(formPayload) {
     return Axios.post(apiUrl+'user/UpdateproServices', formPayload);
} 


/* update the run services */

export const watchGetRunServiceUpdate = function* () {
  yield takeEvery(GET_RUNSERVICEUPDATE, workerGetRunServiceUpdate);
}
function* workerGetRunServiceUpdate({ formPayload }) {
  try {
  const result = yield call(getRunServiceUpdate, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_RUNSERVICEUPDATE, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 

/* enable the user type */
function getRunServiceUpdate(formPayload) {
     return Axios.post(apiUrl+'user/UpdaterunServices', formPayload);
} 


/* update the run services action */

export const watchGetRunServiceAction = function* () {
  yield takeEvery(GET_RUNSERVICEACTION, workerGetRunServiceAction);
}
function* workerGetRunServiceAction({ formPayload }) {
  try {
  const result = yield call(getRunServiceAction, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_RUNSERVICEACTION, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 

/* enable the user type */
function getRunServiceAction(formPayload) {
     return Axios.post(apiUrl+'user/UpdaterunSeraction', formPayload);
}


/* get services list for profile update */

export const watchGetUserProfile = function* () {
  yield takeEvery(GET_USERPROFILE, workerGetUserProfile);
}

function* workerGetUserProfile({usertoken}) {
  try {
    const uri = apiUrl+'user/user_generaldetails?app_name='+appName+'&user_token='+usertoken;
    const result = yield call(Axios.get, uri);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_USERPROFILE, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
} 



/* get address from postal code */

export const watchGetPostalAddress = function* () {
  yield takeEvery(GET_POSTALADDRESS, workerGetPostalAddress);
}
function* workerGetPostalAddress({ formPayload }) {
  try {
  const result = yield call(getPostalAddress, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_POSTALADDRESS, value: resultArr });
  } 
  catch {
    console.log('get data failed');
  }
} 

/* enable the user type */
function getPostalAddress(formPayload) {
     return Axios.post(apiUrl+'user/get_addr_by_zip', formPayload);
}


/* send otp while change mobile number */

export const watchGetMobileUpdate = function* () {
  yield takeEvery(GET_MOBILEUPDATE, workerGetMobileUpdate);
}

function* workerGetMobileUpdate({ formPayload }) {
  try {
  const result = yield call(getMobileUpdate, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_MOBILEUPDATE, value: resultArr });
  } 
  catch {
    console.log('Updatesd failed');
  }
} 


function getMobileUpdate(formPayload) {
       return Axios.post(apiUrl+'user/changemobileno', formPayload);
} 

/*update  mobile number */

export const watchGetChangeMobile = function* () {
  yield takeEvery(GET_CHANGEMOBILE, workerGetChangeMobile);
}

function* workerGetChangeMobile({ formPayload }) {
  try {
  const result = yield call(getChangeMobile, formPayload);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_CHANGEMOBILE, value: resultArr });
  } 
  catch {
    console.log('Updatesd failed');
  }
} 


function getChangeMobile(formPayload) {
       return Axios.post(apiUrl+'user/Updatemobilenumber', formPayload);
} 