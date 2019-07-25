import * as React from "react"
import { Button, ButtonProps, Caption } from "react-native-paper"
import { translate } from "../../i18n"


export interface IOkButtonProps extends ButtonProps {
  label: string;
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function OkButton(props: IOkButtonProps) {
  // grab the props
  const { label, ...rest } = props

  return (
    <Button {...rest}>
      <Caption>
        {translate(label)}
      </Caption>
    </Button>
  )
}
