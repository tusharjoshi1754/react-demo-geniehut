/* eslint-disable */
import { takeEvery, call, put } from "redux-saga/effects";
import { GET_QUOTATION, SET_QUOTATION } from "../actions";
import { apiUrl } from "../components/Config/Config";
import Axios from "axios";

/* change job status ( confirm or Rejected by pro users) */

export const watchGetQuotation = function*() {
  yield takeEvery(GET_QUOTATION, workerGetQuotation);
};
function* workerGetQuotation({ formPayload }) {
  try {
    const result = yield call(getQuotation, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_QUOTATION, value: resultArr });
  } catch {
    console.log("get data failed");
  }
}

function getQuotation(formPayload) {
  return Axios.post(apiUrl + "genpro/quotedetail", formPayload);
}
