import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects';
import { MESSAGE } from '../../constant';
import { getListExpRequest, submitExpRequest } from '../../graphql/ExperienceRequest';
import { getListPJRequest, submitPJRequest } from '../../graphql/ProjectRequest';
import { SearchExpOutput } from '../../models/ExperienceModel';
import { ProcessUpload } from '../../models/LayoutModel';
import { SearchProjectOutput } from '../../models/ProjectModel';
import { getListExpAction, SubmitExpAction } from '../actionTypes/experienceActionTypes';
import { getListPJAction, SubmitPJAction } from '../actionTypes/projectAction';
import { handleMessageErrorSaga, handleMessageSuccessSaga } from '../rootSaga';
import {
  getListExpError,
  getListExpStart,
  getListExpSuccess,
  submitExpSliceError,
  submitExpSliceStart,
  submitExpSliceSuccess,
} from '../slices/experienceSlice';
import { setUploadSliceClose } from '../slices/layoutSlice';
import {
  getListPJError,
  getListPJStart,
  getListPJSuccess,
  submitPJSliceError,
  submitPJSliceStart,
  submitPJSliceSuccess,
} from '../slices/projectSlice';
// import { setProcessUploadSlice } from '../slices/layoutSlice';

function* submitPJSaga({ payload: { input, callback } }: SubmitPJAction) {
  try {
    yield delay(1000);
    yield put(setUploadSliceClose({}));
    const data = yield submitPJRequest(input);
    yield put(submitPJSliceSuccess(data));
    yield handleMessageSuccessSaga(MESSAGE.SUBMIT_SUCCESS);
    yield callback && call(callback);
  } catch (error) {
    yield put(submitPJSliceError({}));
    yield handleMessageErrorSaga(error);
  }
}

function* getListPJSaga({ payload }: getListPJAction) {
  try {
    const data = yield getListPJRequest(payload.input);
    const dataConvert: SearchProjectOutput = { dataProjects: data.dataProjects, total: data.total };
    yield delay(300);
    yield put(getListPJSuccess(dataConvert));
  } catch (error) {
    yield put(getListPJError({}));
    yield handleMessageErrorSaga(error);
  }
}

function* watchHandlePJ() {
  yield takeEvery(submitPJSliceStart, submitPJSaga);
  yield takeEvery(getListPJStart, getListPJSaga);
}

export default function* watchPJSaga(): any {
  yield all([fork(watchHandlePJ)]);
}
