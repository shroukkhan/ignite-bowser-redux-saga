import { all } from "redux-saga/effects"

import startupSagas from "../../services/appstart/startup-sagas"

export default function* rootSaga() {
  yield all([
    startupSagas(),
  ])
}
