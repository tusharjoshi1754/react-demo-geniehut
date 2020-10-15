/* eslint-disable */
import { takeEvery, call, put } from "redux-saga/effects";
import { GET_CHANGE_JOB_STATUS, SET_CHANGE_JOB_STATUS } from "../actions";
import { apiUrl } from "../components/Config/Config";
import Axios from "axios";

export const watchGetChangeJobStatus = function*() {
  yield takeEvery(GET_CHANGE_JOB_STATUS, workerGetChangeJobStatus);
};
function* workerGetChangeJobStatus({ formPayload }) {
  try {
    const result = yield call(getChangeJobStatus, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_CHANGE_JOB_STATUS, value: resultArr });
  } catch {
    console.log("get data failed");
  }
}

function getChangeJobStatus(formPayload) {
  return Axios.post(apiUrl + "genpro/job_status_change", formPayload);
}
