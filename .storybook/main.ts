import { RuleSetRule } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
require("../babel.config");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    "@storybook/addon-webpack5-compiler-babel",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
  staticDirs: [path.join(__dirname, "..", "public")],
  webpackFinal: async (config) => {
    config.resolve!.plugins = [new TsconfigPathsPlugin()];

    const assetRules = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;

      return test.test(".svg");
    }) as RuleSetRule;

    assetRules.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    config.module?.rules?.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
export default config;
