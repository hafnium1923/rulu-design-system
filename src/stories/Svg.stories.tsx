import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import Svg from "@/components/common/Svg";
import Button from "@/components/button/buttonEmotion/Button.emotion";

const meta: Meta<typeof Svg> = {
  component: Svg,
  title: "Common/Svg",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  argTypes: {
    type: {
      control: {
        type: "radio",
        options: ["Arrow", "Clipboard", "Close"],
        labels: {
          Arrow: "화살표",
          Clipboard: "복사",
          Close: "닫기",
        },
      },
      description: "아이콘 이름",
    },
    fill: {
      control: {
        type: "color",
      },
      description: "채우기 색상",
    },
    stroke: {
      control: {
        type: "color",
      },
      description: "테두리 색상",
    },
    size: {
      control: {
        type: "text",
      },
      description: "아이콘 크기",
    },
    width: {
      control: {
        type: "text",
      },
      description: "아이콘 가로 크기",
    },
    height: {
      control: {
        type: "text",
      },
      description: "아이콘 세로 크기",
    },
  },
  render: (args) => <Svg {...args} />,
};
export default meta;

type Story = StoryObj<typeof Svg>;

const Template = ({ args }: Story) => {
  const [type, setType] = useState(args?.type ?? "Arrow");
  return (
    <div style={{ justifyItems: "center" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <Button onClick={() => setType("Clipboard")} variant="primary">
          복사하기
        </Button>
        <Button onClick={() => setType("Close")} variant="primary">
          닫기
        </Button>
        <Button onClick={() => setType("Arrow")} variant="primary">
          화살표
        </Button>
      </div>
      <Svg {...args} type={type} />
    </div>
  );
};

export const Default: Story = {
  args: {
    type: "Arrow",
    size: "30",
  },
  render: (args) => <Template args={args} />,
};
