import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects';
import { MESSAGE } from '../../constant';
import { getListTagRequest, submitTagRequest } from '../../graphql/tagRequest';
import { GetListTagAction, SubmitTagAction } from '../actionTypes/tagActionTypes';
import { handleMessageErrorSaga, handleMessageSuccessSaga } from '../rootSaga';
import { setUploadSliceClose } from '../slices/layoutSlice';
import {
  getTagListSliceError,
  getTagListSliceStart,
  getTagListSliceSuccess,
  submitTagSliceError,
  submitTagSliceStart,
  submitTagSliceSuccess,
} from '../slices/tagSlice';

function* getListTagSaga({ payload }: GetListTagAction) {
  try {
    const data = yield getListTagRequest(payload.input);
    yield delay(300);
    yield put(getTagListSliceSuccess(data));
  } catch (error) {
    yield put(getTagListSliceError({}));
    yield handleMessageErrorSaga(error);
  }
}

function* submitTagSaga({ payload: { input, callback } }: SubmitTagAction) {
  try {
    yield delay(1000);
    yield put(setUploadSliceClose({}));
    const data = yield submitTagRequest(input);
    yield put(submitTagSliceSuccess(data));
    yield handleMessageSuccessSaga(MESSAGE.SUBMIT_SUCCESS);
    yield callback && call(callback);
  } catch (error) {
    yield put(submitTagSliceError({}));
    yield handleMessageErrorSaga(error);
  }
}

function* watchHandleTag() {
  yield takeEvery(getTagListSliceStart, getListTagSaga);
  yield takeEvery(submitTagSliceStart, submitTagSaga);
}

export default function* watchTagSaga(): any {
  yield all([fork(watchHandleTag)]);
}
