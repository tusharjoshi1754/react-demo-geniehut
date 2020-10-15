/* eslint-disable */
import { takeEvery, call, put } from "redux-saga/effects";
import { GET_WRITE_PRO_REVIEW, SET_WRITE_PRO_REVIEW } from "../actions";
import { apiUrl } from "../components/Config/Config";
import Axios from "axios";

export const watchGetWriteProReview = function*() {
  yield takeEvery(GET_WRITE_PRO_REVIEW, workerGetWriteProReview);
};
function* workerGetWriteProReview({ formPayload }) {
  try {
    const result = yield call(getWriteProReview, formPayload);
    var resultArr = [];
    resultArr.push(result.data);
    yield put({ type: SET_WRITE_PRO_REVIEW, value: resultArr });
  } catch {
    console.log("get data failed");
  }
}

function getWriteProReview(formPayload) {
  return Axios.post(apiUrl + "genpro/write_pro_rating", formPayload);
}
