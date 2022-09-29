import { all, call, delay, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { MESSAGE } from '../../constant';
import { getListSkillRequest, submitSkillRequest, updateUserSkillRequest } from '../../graphql/skillRequest';
import { CreateSkillInput, Skill } from '../../models/SkillModel';
import { getListSkillAction, SubmitSkillAction, updateSkillAction } from '../actionTypes/skillActionTypes';
import { handleMessageErrorSaga, handleMessageSuccessSaga } from '../rootSaga';
import { setUploadSliceClose } from '../slices/layoutSlice';
import {
  getListSkillError,
  getListSkillStart,
  getListSkillSuccess,
  submitSkillSliceError,
  submitSkillSliceStart,
  submitSkillSliceSuccess,
  updateSkill,
} from '../slices/skillSlice';

function* submitSkillSaga({ payload: { input, callback } }: SubmitSkillAction) {
  try {
    yield delay(1000);
    yield put(setUploadSliceClose({}));
    const data = yield submitSkillRequest(input);
    yield put(submitSkillSliceSuccess());
    yield handleMessageSuccessSaga(MESSAGE.SUBMIT_SUCCESS);
    yield callback && call(callback);
  } catch (error) {
    yield put(submitSkillSliceError());
    yield handleMessageErrorSaga(error);
  }
}

function* getListSkillSaga({ payload }: getListSkillAction) {
  try {
    const data = yield getListSkillRequest(payload);
    yield delay(300);
    yield put(getListSkillSuccess(data));
  } catch (error) {
    yield put(getListSkillError());
    yield handleMessageErrorSaga(error);
  }
}

function* updateSkillSaga(action: updateSkillAction) {
  const { callback } = action.payload;
  try {
    let dataSkills: Skill[] = yield select((state) => state.skillSlice.dataSkills);
    let updateSkills: CreateSkillInput[] = dataSkills.map((value) => ({
      percent: value.percent,
      status: value.status,
      tagId: value.tagData.id,
    }));
    const data = yield updateUserSkillRequest({ data: updateSkills });

    if (data) yield callback('message.title_success', 'success');
    else yield callback('message.title_error', 'error');
  } catch (error) {
    yield handleMessageErrorSaga(error);
  }
}

function* watchHandleSkill() {
  yield takeEvery(submitSkillSliceStart, submitSkillSaga);
  yield takeLatest(getListSkillStart, getListSkillSaga);
  yield takeLatest(updateSkill, updateSkillSaga);
}

export default function* watchSkillSaga(): any {
  yield all([fork(watchHandleSkill)]);
}
