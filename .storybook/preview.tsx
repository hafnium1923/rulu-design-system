import React from "react";
import { Global } from "@emotion/react";
import type { Preview } from "@storybook/react";
import { globalReset } from "../src/styles/emotion";
import "../src/styles/scss/reset.scss";
import "../src/styles/scss/global.scss";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <Global styles={globalReset} />
      <Story />
    </>
  ),
];

export default preview;
