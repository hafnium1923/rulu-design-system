import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import Switch from "@/components/switch/switchStyled/Switch";
import { fn } from "@storybook/test";

/**
 * 공용 Switch 컴포넌트 - styled-component.Ver
 */
const meta: Meta<typeof Switch> = {
  title: "Common/Switch/styled",
  component: Switch,
  tags: ["autodocs"],
  render: (args) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
      setChecked((prevChecked) => !prevChecked);
    };

    return <Switch {...args} checked={checked} onChange={handleChange} />;
  },
  argTypes: {
    checked: { control: "boolean" },
    onChange: { action: "clicked" },
    size: {
      control: {
        type: "select",
        options: ["xSmall", "small", "medium", "large"],
      },
      description: "스위치 크기",
    },
    variant: {
      control: {
        type: "select",
        options: ["solid", "raised"],
      },
      description:
        "solid : track안에 thumb이 들어 있는 유형, raised : track보다 thumb이 큰 유형",
    },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    description: {
      control: "text",
      description: "스위치에 대한 설명이 되는 컴포넌트",
    },
    descriptionPosition: {
      control: {
        type: "select",
        options: ["top", "bottom", "left", "right"],
      },
      description: "설명 위치(상/하/좌/우)",
    },
    onLabel: {
      control: "text",
      description:
        "스위치가 켜져 있을 때의 트랙 라벨 내 들어갈 텍스트 또는 아이콘",
    },
    offLabel: {
      control: "text",
      description:
        "스위치가 꺼져 있을 때의 트랙 라벨 내 들어갈 텍스트 또는 아이콘",
    },
    onThumb: {
      control: "text",
      description: "스위치가 켜져 있을 때의 thumb 내 들어갈 텍스트 또는 아이콘",
    },
    offThumb: {
      control: "text",
      description: "스위치가 꺼져 있을 때의 thumb 내 들어갈 텍스트 또는 아이콘",
    },
    onColor: {
      control: "color",
      description: "스위치가 켜져 있을 때의 트랙 색상",
    },
    offColor: {
      control: "color",
      description: "스위치가 꺼져 있을 때의 트랙 색상",
    },
    thumbOnColor: {
      control: "color",
      description: "스위치가 켜져 있을 때의 thumb 색상",
    },
    thumbOffColor: {
      control: "color",
      description: "스위치가 꺼져 있을 때의 thumb 색상",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    size: "medium",
    checked: false,
    onChange: fn(),
  },
};

export const Raised: Story = {
  args: {
    size: "medium",
    checked: false,
    onChange: fn(),
    variant: "raised",
  },
};

export const ExtraSmall: Story = {
  args: {
    size: "xSmall",
    checked: false,
    onChange: fn(),
  },
};

export const Small: Story = {
  args: {
    size: "small",
    checked: false,
    onChange: fn(),
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    checked: false,
    onChange: fn(),
  },
};

export const Large: Story = {
  args: {
    size: "large",
    checked: false,
    onChange: fn(),
  },
};

export const WithDescription: Story = {
  args: {
    size: "medium",
    checked: false,
    onChange: fn(),
    description: <div>이것은 설명입니다.</div>,
  },
};

export const WithDescriptionComponent: Story = {
  args: {
    size: "medium",
    checked: false,
    onChange: fn(),
    description: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginLeft: "8px" }}>로그인</span>
      </div>
    ),
  },
};

export const WithCustomColor: Story = {
  args: {
    size: "medium",
    checked: false,
    onChange: fn(),
    onColor: "rgb(21, 99, 223)",
    offColor: "#99b4d9",
    thumbOnColor: "#1a0cdc",
    thumbOffColor: "#040d32",
  },
};

export const WithThumbText: Story = {
  args: {
    size: "large",
    checked: false,
    onChange: fn(),
    onThumb: "ON",
    offThumb: "OFF",
  },
};

export const WithInnerLabel: Story = {
  args: {
    size: "large",
    checked: false,
    onChange: fn(),
    onLabel: "자동 업데이트",
    offLabel: "수동 업데이트",
  },
};

export const Disabled: Story = {
  args: {
    size: "medium",
    checked: false,
    onChange: fn(),
    description: "Disabled switch",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    size: "medium",
    checked: false,
    onChange: fn(),
    description: "Read-only switch",
    readonly: true,
  },
};

export const Playground: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
      console.log("Switch Changed");
      setChecked((prevChecked) => !prevChecked);
    };

    return (
      <div style={{ display: "flex", gap: "20px" }}>
        <Switch size="medium" checked={checked} onChange={handleChange} />
        {checked && <div>💡</div>}
      </div>
    );
  },
  args: {
    size: "medium",
    variant: "solid",
  },
};
