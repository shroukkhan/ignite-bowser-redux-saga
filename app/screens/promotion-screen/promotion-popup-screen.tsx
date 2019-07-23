import * as React from "react"
import { ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"

export interface PromotionPopupScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}


export class PromotionPopupScreen extends React.Component<PromotionPopupScreenProps, {}> {
  render () {
    return (
      <Screen style={ROOT} preset="scroll">
        <Text preset="header" tx="PromotionPopupScreen.header" />
      </Screen>
    )
  }
}
