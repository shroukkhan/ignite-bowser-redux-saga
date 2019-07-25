import * as React from "react"
// tslint:disable-next-line
import { storiesOf } from "@storybook/react-native"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { OkTextinput } from "./"

storiesOf("OkTextinput", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <OkTextinput label="OkTextinput" />
      </UseCase>
    </Story>
  ))
