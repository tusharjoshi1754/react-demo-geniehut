/* eslint-disable */
import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_STATICBLOCKCONTENT, SET_STATICBLOCKCONTENT, GET_HOMEBLOCKCONTENT, SET_HOMEBLOCKCONTENT, GET_SITESETTINGS, SET_SITESETTINGS, GET_CMSPAGE, SET_CMSPAGE } from '../actions';
import {apiUrl,appName} from "../components/Config/Config";
import Axios from 'axios';
import cookie from 'react-cookies';


/* get staticblocks content*/

export const watchGetStaticblockContent = function* () {
  yield takeEvery(GET_STATICBLOCKCONTENT, workerGetStaticblockContent);
}

function* workerGetStaticblockContent( { slug } ) {
  try {
    const uri = apiUrl+'cms/staticblock?app_name='+appName+'&page_slug='+slug;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_STATICBLOCKCONTENT, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}

/* get homepage staticblocks content*/

export const watchGetHomeblockContent = function* () {
  yield takeEvery(GET_HOMEBLOCKCONTENT, workerGetHomeblockContent);
}

function* workerGetHomeblockContent() {
  try {
    const uri = apiUrl+'cms/homestaticcontent?app_name='+appName;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_HOMEBLOCKCONTENT, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}

/* get sitesettings data */

export const watchGetSiteSettings = function* () {
  yield takeEvery(GET_SITESETTINGS, workerGetSiteSettings);
}

function* workerGetSiteSettings() {
  try {
    const uri = apiUrl+'cms/site_settings?app_name='+appName;
    const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
    yield put({ type: SET_SITESETTINGS, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}

/* get cms page */

export const watchGetCmsPage = function* () {
  yield takeEvery(GET_CMSPAGE, workerGetCmsPage);
}

function* workerGetCmsPage({ slug }) {
  try {
  const uri = apiUrl+'cms/page?app_name='+appName+'&page_slug='+slug;
  const result = yield call(Axios.get, uri);
  var resultArr = [];
  resultArr.push(result.data);
  yield put({ type: SET_CMSPAGE, value: resultArr });
  } 
  catch {
    console.log('Get Page Failed');
  }
}
