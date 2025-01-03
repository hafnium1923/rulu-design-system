import type { Meta, StoryObj } from "@storybook/react";

import Button, {
  type ButtonProps,
} from "@/components/button/buttonSCSS/Button.scss";

/**
 * 공용 버튼 컴포넌트 - scss.Ver
 * button 태그의 모든 속성 가능
 */
const meta = {
  title: "Common/Button/scss",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  argTypes: {
    variant: {
      options: ["primary", "normal", "plain"],
      control: { type: "radio" },
      description:
        "버튼의 형태를 말하는 것으로 plain은 svg등 이미지를 이용한 스타일이 필요할 때 사용",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
      description: "버튼 크기",
    },
    children: {
      control: { type: "text" },
      description: "버튼에 표시될 자식 요소",
    },
    css: {
      control: { type: "object" },
      description: "사용자 지정 버튼 스타일",
    },
  },
  args: {
    variant: "normal",
    size: "medium",
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const createButtonStory = (variant: ButtonProps["variant"]) => ({
  args: {
    variant,
  },
  render: (args: Omit<ButtonProps, "ref">) => <Button {...args} />,
});

export const Default: Story = {};

export const Normal: Story = createButtonStory("normal");

export const Primary: Story = createButtonStory("primary");

export const Plain: Story = createButtonStory("plain");
