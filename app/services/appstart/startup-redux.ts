import { createActions, createReducer } from "reduxsauce"
import Immutable from "seamless-immutable"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  startupComplete: null,
})

export const StartupTypes = Types
export default Creators

export const StartupSelector = (state, variable) => state.startup[variable]

export const INITIAL_STATE = Immutable({
  startupComplete: false,
})

export const startupComplete = (state) => {
  return state.merge({ startupComplete: true })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP_COMPLETE]: startupComplete,
})
