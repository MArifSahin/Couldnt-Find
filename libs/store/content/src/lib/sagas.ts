import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from '@internship/shared/api';
import { writeUserReviewAsync } from './actions';

function* doWriteUserReview({ payload }) {
  try {
    const data = yield call(api.book.writeUserReview, payload);
    yield put(writeUserReviewAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(writeUserReviewAsync.failure(e));
  }
}

function* watchWriteUserReview() {
  yield takeLatest(writeUserReviewAsync.request, doWriteUserReview);
}

export function* contentSaga() {
  yield all([
    fork(watchWriteUserReview)
  ]);
}
