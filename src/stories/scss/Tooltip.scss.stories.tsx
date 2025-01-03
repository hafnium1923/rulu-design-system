import { Meta, StoryObj } from "@storybook/react";

import Tooltip from "@/components/tooltip/tooltipSCSS/Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Common/Tooltip/scss",
  component: Tooltip,
  tags: ["autodocs"],
  render: (args) => (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "300px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tooltip {...args} />
    </div>
  ),
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      defaultValue: "Tooltip",
      description: "툴팁 내용",
    },
    opened: {
      control: {
        type: "boolean",
      },
      defaultValue: true,
      description: "툴팁 항상 열림 여부",
    },
    position: {
      control: {
        type: "select",
      },
      description: "기준 컴포넌트 기반 툴팁 위치",
    },
    color: {
      control: {
        type: "color",
      },
      description: "툴팁 색상",
    },
    mainAxis: {
      control: {
        type: "number",
      },
      description: "메인 축 간격(상/하 일 때만 적용되는 offset)",
    },
    crossAxis: {
      control: {
        type: "number",
      },
      description: "크로스 축 간격(좌/우 일 때만 적용되는 offset)",
    },
    withArrow: {
      control: {
        type: "boolean",
      },
      description: "화살표 여부",
    },
    control: {
      control: {
        type: "select",
      },
      description: "컨트롤(호버/클릭)",
    },
    disabled: {
      control: {
        type: "boolean",
      },
      description: "비활성화 여부",
    },
    style: {
      control: {
        type: "object",
      },
      description: "스타일",
    },
  },
  args: {
    label: <span>Tooltip</span>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type TooltipStory = StoryObj<typeof meta>;

export const Top: TooltipStory = {
  args: {
    opened: true,
    position: "top",
    children: <div>Hover over me</div>,
  },
};

export const Bottom: TooltipStory = {
  args: {
    opened: true,
    position: "bottom",
    children: <div>Hover over me</div>,
  },
};

export const Left: TooltipStory = {
  args: {
    opened: true,
    position: "left",
    children: <div>Hover over me</div>,
  },
};

export const Right: TooltipStory = {
  args: {
    opened: true,
    position: "right",
    children: <div>Hover over me</div>,
  },
};

export const TopStart: TooltipStory = {
  args: {
    opened: true,
    position: "top-start",
    children: <div>Hover over me</div>,
  },
};

export const TopEnd: TooltipStory = {
  args: {
    opened: true,
    position: "top-end",
    children: <div>Hover over me</div>,
  },
};

export const BottomStart: TooltipStory = {
  args: {
    opened: true,
    position: "bottom-start",
    children: <div>Hover over me</div>,
  },
};

export const BottomEnd: TooltipStory = {
  args: {
    opened: true,
    position: "bottom-end",
    children: <div>Hover over me</div>,
  },
};

export const LeftStart: TooltipStory = {
  args: {
    opened: true,
    position: "left-start",
    children: <div>Hover over me</div>,
  },
};

export const LeftEnd: TooltipStory = {
  args: {
    opened: true,
    position: "left-end",
    children: <div>Hover over me</div>,
  },
};

export const RightStart: TooltipStory = {
  args: {
    opened: true,
    position: "right-start",
    children: <div>Hover over me</div>,
  },
};

export const RightEnd: TooltipStory = {
  args: {
    opened: true,
    position: "right-end",
    children: <div>Hover over me</div>,
  },
};

export const Disabled: TooltipStory = {
  args: {
    disabled: true,
    children: <div>Disabled</div>,
  },
};

export const WithoutArrow: TooltipStory = {
  args: {
    opened: true,
    withArrow: false,
    children: <div>Hover over me</div>,
  },
};

export const CustomColor: TooltipStory = {
  args: {
    opened: true,
    color: "blue",
    children: <div>Hover over me</div>,
  },
};

export const CustomStyle: TooltipStory = {
  args: {
    opened: true,
    style: { background: "pink", color: "purple" },
    children: <div>Hover over me</div>,
  },
};

export const Clickable: TooltipStory = {
  args: {
    control: "click",
    children: <div>Click me</div>,
  },
};
