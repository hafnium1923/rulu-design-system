import { useState } from "react";

//* external
import type { Meta, StoryObj } from "@storybook/react";

import { COLOR } from "@/constants/color";
import Svg from "@/components/common/Svg";
import Button from "@/components/button/buttonSCSS/Button.scss";
import Divider from "@/components/divider/dividerSCSS/Divider.scss";
import Badge, { type ColorKey } from "@/components/badge/badgeSCSS/Badge.scss";

/**
 * 공용 Badge 컴포넌트 - scss.Ver
 */
const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Badge/scss",
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: {
        type: "text",
      },
      description: "Badge를 표시할 컴포넌트 혹은 텍스트",
    },
    position: {
      control: {
        type: "radio",
        options: ["right", "left"],
      },
      description: "Badge 위치를 설정 (수평)",
    },
    direction: {
      control: {
        type: "radio",
        options: ["top", "bottom"],
      },
      description: "Badge 위치를 설정 (수직)",
    },
    badgeContent: {
      control: {
        type: "number",
        max: 10,
        min: 0,
      },
      description: "Badge 내용을 설정",
    },
    max: {
      control: {
        type: "number",
        max: 10,
      },
      description: "Badge 최대값을 설정",
    },
    overlap: {
      control: {
        type: "radio",
        options: ["rectangle", "circle"],
      },
      description: "Badge 모양을 설정",
    },
    showZero: {
      control: {
        type: "boolean",
      },
      description: "0일때 Badge를 표시할지 설정",
    },
    visible: {
      control: {
        type: "boolean",
      },
      description: "Badge를 표시할지 설정",
    },
    color: {
      control: {
        type: "radio",
        options: ["BLACK", "RED", "BLUE"],
      },
      description: "Badge 색상을 설정 (color객체 내에서 사용가능)",
    },
    textColor: {
      control: {
        type: "radio",
        options: ["BLACK", "WHITE"],
      },
      description: "Badge 텍스트 색상을 설정 (color객체 내에서 사용가능)",
    },
  },
  render: (args) => <Badge {...args}></Badge>,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const WithText: Story = {
  args: {
    children: "Text Badge",
    badgeContent: "New",
  },
};

const UpDownBadge = ({ args }: Story) => {
  const [number, setNumber] = useState(args!.badgeContent as number);
  return (
    <>
      <Badge {...args} badgeContent={number}>
        <span>숫자조절</span>
      </Badge>
      <br />
      <br />
      <div style={{ maxWidth: 100 }}>
        <Divider>click!</Divider>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <Button onClick={() => setNumber(number + 1)}>+</Button>
          <Button
            onClick={() => setNumber(number - 1)}
            disabled={number <= 0}
            style={{ fontSize: 35 }}
          >
            -
          </Button>
        </div>
      </div>
    </>
  );
};

export const WithNumber: Story = {
  args: {
    children: "Number Badge",
    badgeContent: 5,
    max: 9,
    showZero: false,
  },
  render: (args) => <UpDownBadge args={args} />,
};

export const CircleOverlap: Story = {
  args: {
    children: <Svg type="CheckCircle" />,
    overlap: "circle",
  },
};

const ColorBadge = ({ args }: Story) => {
  const [color, setColor] = useState(args!.color);
  const [textColor, setTextColor] = useState(args!.textColor);
  return (
    <div>
      <Badge {...args} color={color} textColor={textColor}>
        {color}
      </Badge>
      <br />
      <br />
      <Divider align="center" style={{ width: 400 }}>
        Badge Color
      </Divider>
      <br />
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 400 }}
      >
        {Object.entries(COLOR).map(
          ([key, value]) =>
            key !== "WHITE" && (
              <Button
                onClick={() => setColor(key as ColorKey)}
                key={value}
                style={{
                  backgroundColor: value,
                  borderColor: value,
                  color: key === "WHITE" ? "BLACK" : "WHITE",
                }}
              >
                {key}
              </Button>
            )
        )}
        <br />
        <br />
      </div>
      <Divider align="center" style={{ width: 400, marginTop: 30 }}>
        text Color
      </Divider>
      <br />
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 400 }}
      >
        {Object.entries(COLOR).map(([key, value]) => (
          <Button
            onClick={() => setTextColor(key as ColorKey)}
            key={value}
            style={{
              color: key !== "WHITE" ? value : "BLACK",
              borderColor: value,
            }}
          >
            {key}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const SwitchColor: Story = {
  args: {
    children: "Color Badge",
    badgeContent: 5,
    color: "RED",
    textColor: "WHITE",
  },
  render: (args) => <ColorBadge args={args} />,
};
