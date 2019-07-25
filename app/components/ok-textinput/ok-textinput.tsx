import * as React from "react"
import { TextInput, TextInputProps } from "react-native-paper"


// tslint:disable-next-line
export interface IOkTextinputProps extends TextInputProps {

}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function OkTextinput(props: IOkTextinputProps) {

  return (
    <TextInput {...props}/>
  )
}
