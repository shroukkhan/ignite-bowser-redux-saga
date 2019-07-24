// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import "./i18n"
import { AppRegistry } from "react-native"
import { StorybookUIRoot } from "../storybook"
import React, { Component } from "react"
import { Provider } from "react-redux"
import RootContainer from "./root-container"
import createStore from "./services/root-store/root-redux"

const store = createStore()

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "OKKAMI3"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

const RootComponent = SHOW_STORYBOOK && __DEV__ ? StorybookUIRoot : App
AppRegistry.registerComponent(APP_NAME, () => RootComponent)
