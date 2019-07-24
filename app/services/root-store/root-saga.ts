import { all } from "redux-saga/effects"

import startupSagas from "../appstart/startup-sagas"

export default function* rootSaga() {
  yield all([
    startupSagas(),
  ])
}
