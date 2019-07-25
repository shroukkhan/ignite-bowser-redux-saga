import { all } from "redux-saga/effects"

import startupSagas from "../appstart/startup-sagas"
import accountSagas from "../../screens/account-screen/account-saga"
import locationSagas from "../location/location-sagas"

export default function* rootSaga() {
  yield all([
    startupSagas(),
    accountSagas(),
    locationSagas(),
  ])
}
