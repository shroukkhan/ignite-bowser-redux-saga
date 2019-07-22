import React, { Component } from "react"
import { StatusBar, View } from "react-native"
import ReduxNavigation from "./services/navigation/redux-nagivation"
import { connect } from "react-redux"
import StartupActions from "./services/appstart/startup-redux"
import ReduxPersist from "./config/redux-persist"

class RootContainer extends Component <{
  startup: () => void
}> {

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='dark-content'/>
        <ReduxNavigation/>
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  null,
  mapDispatchToProps,
)(RootContainer)
