import ReduxPersist from "../../config/redux-persist"
import { AsyncStorage } from "react-native"
import { persistStore } from "redux-persist"
import StartupActions from "../appstart/startup-redux"

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const startup = () => store.dispatch(StartupActions.startup())

  // Check to ensure latest reducer version
  AsyncStorage.getItem("reducerVersion").then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      persistStore(store, null, startup).purge()
      AsyncStorage.setItem("reducerVersion", reducerVersion)
    } else {
      persistStore(store, null, startup)
    }
  }).catch(() => {
    persistStore(store, null, startup)
    AsyncStorage.setItem("reducerVersion", reducerVersion)
  })
}

export default { updateReducers }
