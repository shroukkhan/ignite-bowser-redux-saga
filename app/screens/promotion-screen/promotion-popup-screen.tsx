import * as React from "react"
import { Text, View } from "react-native"
import { NavigationScreenProps } from "react-navigation"

export interface IPromotionPopupScreenProps extends NavigationScreenProps<{}> {
}


export class PromotionPopupScreen extends React.Component<IPromotionPopupScreenProps, {}> {
  public render () {
    return (
      <View style={{ flex: 1 }}>
        <Text>PromotionPopupScreen</Text>
      </View>
    )
  }
}
