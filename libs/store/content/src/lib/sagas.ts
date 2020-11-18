import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from '@internship/shared/api';
import { writeEditorReviewAsync, writeUserReviewAsync } from './actions';

function* doWriteUserReview({ payload }) {
  try {
    console.log('sagas');
    yield call(api.book.writeUserReview, payload);
    yield put(writeUserReviewAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(writeUserReviewAsync.failure(e));
  }
}

function* doWriteEditorReview({ payload }) {
  try {
    console.log('sagas');
    yield call(api.book.writeEditorReview, payload);
    yield put(writeEditorReviewAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(writeEditorReviewAsync.failure(e));
  }
}

function* watchWriteUserReview() {
  yield takeLatest(writeUserReviewAsync.request, doWriteUserReview);
}

function* watchWriteEditorReview() {
  yield takeLatest(writeEditorReviewAsync.request, doWriteEditorReview);
}

export function* contentSaga() {
  yield all([
    fork(watchWriteUserReview),
    fork(watchWriteEditorReview)
  ]);
}
