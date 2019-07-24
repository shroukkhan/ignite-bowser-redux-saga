import * as React from "react"
import { Text, View } from "react-native"
import { NavigationScreenProps } from "react-navigation"

export interface ILoginOptionsScreenProps extends NavigationScreenProps<{}> {
}


export class LoginOptionsScreen extends React.Component<ILoginOptionsScreenProps, {}> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Login Options Screen</Text>
      </View>
    )
  }
}
