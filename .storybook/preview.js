import React from "react"
import { RecoilRoot } from "recoil"
import Theme from "universal-data-tool/components/Theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <Theme>
        <Story />
      </Theme>
    </RecoilRoot>
  ),
]
