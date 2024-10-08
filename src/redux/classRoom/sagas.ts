import {
  getSubjectClassRoomRequest,
  getSubjectClassRoomFailure,
  getSubjectClassRoomSuccess,
} from './actions';

import isEmpty from 'lodash/isEmpty';
import { call, ForkEffect, put, takeLatest } from 'redux-saga/effects';
import { IClassSuccessPayload } from '../../interfaces/Class';
import { getClass } from './api';

function* getClassRoomWorker() {
  try {
    const response: IClassSuccessPayload = yield call(getClass);
    if (!isEmpty(response)) {
      yield put(getSubjectClassRoomSuccess(response));
    } else {
      yield put(getSubjectClassRoomFailure());
    }
  } catch (e) {
    yield put(getSubjectClassRoomFailure());
    console.log(e);
  }
}

function* classRoomSagas(): Generator<ForkEffect<never>, void> {
  yield takeLatest(getSubjectClassRoomRequest.type, getClassRoomWorker);
}
export default classRoomSagas;
