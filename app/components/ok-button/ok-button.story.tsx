import * as React from "react"
// tslint:disable-next-line
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { OkButton } from "./"

storiesOf("OkButton", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <OkButton label="OkButton" />
      </UseCase>
    </Story>
  ))
