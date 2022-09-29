import { all, put } from 'redux-saga/effects';
import { NotifySystem, TypeNotify } from '../models/LayoutModel';
import { setNotifySlice } from './slices/layoutSlice';
import WatchLoginSaga from './sagas/loginSaga';
import watchTagSaga from './sagas/tagSaga';
import watchExpSaga from './sagas/experienceSaga';
import { watchSeoHome } from './sagas/seoHomeSaga';
import watchPJSaga from './sagas/projectSaga';
import watchSkillSaga from './sagas/skillSaga';

function* rootSaga() {
  yield all([WatchLoginSaga(), watchTagSaga(), watchSeoHome(), watchExpSaga(), watchPJSaga(), watchSkillSaga()]);
}

export function* handleMessageErrorSaga(error) {
  yield console.log('catch: ', error);
  yield put(
    setNotifySlice({
      messageNotify: error.message,
      typeNotify: TypeNotify.ERROR,
      createTime: new Date().getTime(),
    } as NotifySystem)
  );
}
export function* handleMessageSuccessSaga(messageNotify) {
  yield put(
    setNotifySlice({ messageNotify, typeNotify: TypeNotify.SUCCESS, createTime: new Date().getTime() } as NotifySystem)
  );
}

export default rootSaga;
