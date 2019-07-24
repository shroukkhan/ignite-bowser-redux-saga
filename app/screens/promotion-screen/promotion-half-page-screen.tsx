import * as React from "react"
import { Text, View } from "react-native"

import { NavigationScreenProps } from "react-navigation"

export interface IPromotionHalfPageScreenProps extends NavigationScreenProps<{}> {
}




export class PromotionHalfPageScreen extends React.Component<IPromotionHalfPageScreenProps, {}> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>PromotionHalfPageScreen</Text>
      </View>
    )
  }
}
