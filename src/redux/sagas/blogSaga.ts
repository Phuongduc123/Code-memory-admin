import { all, fork, put, takeEvery } from 'redux-saga/effects';

import { addBlogAction, ADD_BLOG_REQUESTING } from '../actionTypes/blogActionTypes';

function* onAddBlog(action: addBlogAction) {
  // try {
  //   const data: Blog = yield addBlogRequest(action.BlogInput);
  //   yield put(actionBlog.addBlogSuccess(data));
  // } catch (error) {
  //   yield put(actionLogin.postLoginError(error?.message as string));
  // }
}

function* watchHandleBlog() {
  yield takeEvery(ADD_BLOG_REQUESTING, onAddBlog);
}

export default function* blogSaga(): any {
  yield all([fork(watchHandleBlog)]);
}
