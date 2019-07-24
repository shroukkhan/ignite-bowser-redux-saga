import * as React from "react"
import { Text, View } from "react-native"

import { NavigationScreenProps } from "react-navigation"

export interface IPromotionFullPageScreenProps extends NavigationScreenProps<{}> {
}


export class PromotionFullPageScreen extends React.Component<IPromotionFullPageScreenProps, {}> {
  public render () {
    return (
      <View style={{ flex: 1 }}>
        <Text>PromotionHalfPageScreen</Text>
      </View>
    )
  }
}
