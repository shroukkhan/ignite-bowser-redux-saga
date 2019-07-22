import { all, put, takeLatest } from "redux-saga/effects"
import StartupActions, { StartupTypes } from "./startup-redux"

export function* startup() {
  yield put(StartupActions.startupComplete())
}

export default function* rootSaga() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
  ])
}
