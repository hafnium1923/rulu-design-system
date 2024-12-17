import type { Meta, StoryObj } from "@storybook/react";
import Divider from "@/components/divider/dividerSCSS/Divider.scss";

/**
 * 공용 Divider 컴포넌트 - scss.Ver
 */
const meta = {
  title: "Divider/scss",
  component: Divider,
  tags: ["autodocs"],
  render: (args) => (
    <div
      style={{
        display: "flex",
        width: "80%",
        height: "300px",
        border: "1px solid black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Divider {...args} />
    </div>
  ),
  argTypes: {
    variant: {
      options: ["full", "insetFront", "insetBack", "middle"],
      control: "radio",
      description: "Divider이 보여질 길이",
    },
    orientation: {
      options: ["horizontal", "vertical"],
      control: "radio",
      description: "수직, 수평",
    },
    align: {
      options: ["left", "center", "right"],
      control: "radio",
      description:
        "자식의 정렬 위치, 수직일때는 left가 top right가 bottom을 의미한다.",
    },
    children: {
      control: { type: "text" },
      description:
        "자식컴포넌트. 뭐든 올 수 있지만 스토리북에서는 text으로 제어가능",
    },
    as: {
      options: ["li", undefined],
      description: "li안에서 사용할 divider이면 입력. return시 li로 해준다.",
    },
    margin: {
      control: { type: "number" },
      description: '앞 뒤 margin값. variant가 "full"일 땐 무시된다.',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PlayGround: Story = {
  args: { as: undefined, className: undefined },
  argTypes: {
    variant: {
      options: ["full", "insetFront", "insetBack", "middle"],
      control: "radio",
      description: "Divider이 보여질 길이",
    },
    orientation: {
      options: ["horizontal", "vertical"],
      control: "radio",
      description: "수직, 수평",
    },
    align: {
      options: ["center", "left", "right"],
      control: "radio",
      description:
        "자식의 정렬 위치, 수직일때는 left가 top right가 bottom을 의미한다.",
    },
    children: {
      control: { type: "text" },
      description:
        "자식컴포넌트. 뭐든 올 수 있지만 스토리북에서는 text으로 제어가능",
    },
    as: {
      options: ["li", undefined],
      description: "li안에서 사용할 divider이면 입력. return시 li로 해준다.",
    },
  },
};

export const Default: Story = {
  args: {
    variant: "full",
    orientation: "horizontal",
    align: "center",
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const DefaultVertical: Story = {
  args: {
    variant: "full",
    orientation: "vertical",
    align: "center",
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const InsetFrontHorizontal: Story = {
  args: {
    variant: "insetFront",
    orientation: "horizontal",
    align: "center",
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const InsetFrontVertical: Story = {
  args: {
    variant: "insetFront",
    orientation: "vertical",
    align: "center",
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const CustomMarginHorizontal: Story = {
  args: {
    variant: "insetFront",
    orientation: "horizontal",
    align: "center",
    margin: 500,
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const InsetBackHorizontal: Story = {
  args: {
    variant: "insetBack",
    orientation: "horizontal",
    align: "center",
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const InsetBackVertical: Story = {
  args: {
    variant: "insetBack",
    orientation: "vertical",
    align: "center",
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const MiddleHorizontal: Story = {
  args: {
    variant: "middle",
    orientation: "horizontal",
    align: "center",
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const MiddleVertical: Story = {
  args: {
    variant: "middle",
    orientation: "vertical",
    align: "center",
    as: undefined,
    className: undefined,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const AlignHorizontalCenter: Story = {
  args: {
    variant: "full",
    orientation: "horizontal",
    align: "center",
    as: undefined,
    className: undefined,
    children: <span>Children</span>,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const AlignHorizontalLeft: Story = {
  args: {
    variant: "full",
    orientation: "horizontal",
    align: "left",
    as: undefined,
    className: undefined,
    children: <span>Children</span>,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const AlignHorizontalRight: Story = {
  args: {
    variant: "full",
    orientation: "horizontal",
    align: "right",
    as: undefined,
    className: undefined,
    children: <span>Children</span>,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const AlignVerticalCenter: Story = {
  args: {
    variant: "full",
    orientation: "vertical",
    align: "center",
    as: undefined,
    className: undefined,
    children: <span>Children</span>,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const AlignVerticalTop: Story = {
  args: {
    variant: "full",
    orientation: "vertical",
    align: "left",
    as: undefined,
    className: undefined,
    children: <span>Children</span>,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const AlignVerticalBottom: Story = {
  args: {
    variant: "full",
    orientation: "vertical",
    align: "right",
    as: undefined,
    className: undefined,
    children: <span>Children</span>,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};

export const ListItem: Story = {
  args: {
    variant: "insetBack",
    as: "li",
    className: undefined,
    children: <span>Children</span>,
  },
  argTypes: {
    variant: {
      control: false,
    },
    orientation: {
      control: false,
    },
    align: {
      control: false,
    },
    children: {
      control: false,
    },
    as: {
      control: false,
    },
  },
};
