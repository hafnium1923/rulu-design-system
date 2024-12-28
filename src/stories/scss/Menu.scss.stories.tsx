import type { Meta, StoryObj } from "@storybook/react";

import Menu from "@/components/menu/menuSCSS/Menu.scss";
import { NO_TRIGGER, TRIGGER_KEYS } from "@/constants/keyboard";
import Svg from "@/components/common/Svg";

/**
 * 공용 Menu 컴포넌트 - scss.Ver
 * 모달, 레이아웃, 헤더, 바디, 푸터를 조합하여 사용
 */
const meta = {
  title: "Menu/scss",
  component: Menu,
  tags: ["autodocs"],
  argTypes: {
    context: {
      direction: {
        options: ["left", "right", "top", "bottom"],
        control: "radio",
        description: "메뉴 렌더링 방향",
      },
      position: {
        options: ["left", "right"],
        control: "radio",
        description: "메뉴 포지션 방향",
      },
      backgroundClose: {
        control: "boolean",
        description: "메뉴 밖 클릭으로 드로워 닫을지 옵션",
      },
      rememberItem: {
        control: "boolean",
        description: "직전 선택한 메뉴를 기억할지 옵션",
      },
      handleItemSelect: {
        control: { type: "function" },
        description: "아이템이 션택 되었을 때 실행할 함수",
      },
      controlKeys: {
        options: [NO_TRIGGER, ...Object.values(TRIGGER_KEYS)],
        control: { type: "select" },
      },
      description: `direction: 메뉴 렌더링 방향 \n\n position: 메뉴 포지션 방향 \n\n backgroundClose: 메뉴 밖 클릭으로 드로워 닫을지 옵션 \n\n rememberItem: 직전 선택한 메뉴를 기억할지 옵션 \n\n handleItemSelect:아이템이 션택 되었을 때 실행할 함수 \n\n controlKeys: 메뉴 아이템에서 활성화 할 키보드 키`,
    },
  },
  render: (args) => {
    return (
      <Menu {...args}>
        <Menu.Button
          style={{
            backgroundColor: "#516fff",
            width: "100px",
            height: "50px",
            borderRadius: "4px",
            color: "#fff",
          }}
        >
          메뉴 열기
        </Menu.Button>
        {args.children}
      </Menu>
    );
  },
  decorators: (Story, content) => {
    if (
      content.name.includes("Direction") ||
      content.name.includes("Position")
    ) {
      return Story();
    }
    return (
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "300px",
          border: "1px solid black",
          padding: "20px",
        }}
      >
        {Story()}
      </div>
    );
  },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
    },
    children: (
      <Menu.List>
        <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
        <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
        <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
        <Menu.Item value="메뉴 4">
          <Svg type="Logo" width="30" />
        </Menu.Item>
      </Menu.List>
    ),
  },
};
export const MenuWithDivider: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
    },
    children: (
      <Menu.List>
        <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
        <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
        <li
          style={{ width: "100%", height: "2px", backgroundColor: "#000" }}
          role="separator"
        />
        <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
        <Menu.Item value="메뉴 4">
          <Svg type="Logo" width="30" />
        </Menu.Item>
      </Menu.List>
    ),
  },
};
export const MenuGroup: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
    },
    children: (
      <Menu.List>
        <Menu.Group title={"그룹제목"}>
          <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
          <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
          <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
          <Menu.Item value="메뉴 4">
            <Svg type="Logo" width="30" />
          </Menu.Item>
        </Menu.Group>
        <Menu.Group title={"그룹제목2"}>
          <Menu.Item value="메뉴 5">메뉴 5</Menu.Item>
          <Menu.Item value="메뉴 6">메뉴 6</Menu.Item>
          <Menu.Item value="메뉴 7">메뉴 7</Menu.Item>
          <Menu.Item value="메뉴 8">
            <Svg type="Logo" width="30" />
          </Menu.Item>
        </Menu.Group>
      </Menu.List>
    ),
  },
};
export const LongLongMenu: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
    },
    children: (
      <Menu.List>
        <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
        <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
        <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
        <Menu.Item value="메뉴 4">
          <Svg type="Logo" width="30" />
        </Menu.Item>
        <Menu.Item value="메뉴 5">메뉴 5</Menu.Item>
        <Menu.Item value="메뉴 6">메뉴 6</Menu.Item>
        <Menu.Item value="메뉴 7">메뉴 7</Menu.Item>
        <Menu.Item value="메뉴 8">
          <Svg type="Logo" width="30" />
        </Menu.Item>
        <Menu.Item value="메뉴 9">메뉴 9</Menu.Item>
        <Menu.Item value="메뉴 10">메뉴 10</Menu.Item>
        <Menu.Item value="메뉴 11">메뉴 11</Menu.Item>
        <Menu.Item value="메뉴 12">
          <Svg type="Logo" width="30" />
        </Menu.Item>
        <Menu.Item value="메뉴 13">메뉴 13</Menu.Item>
        <Menu.Item value="메뉴 14">메뉴 14</Menu.Item>
        <Menu.Item value="메뉴 15">메뉴 15</Menu.Item>
        <Menu.Item value="메뉴 16">
          <Svg type="Logo" width="30" />
        </Menu.Item>
        <Menu.Item value="메뉴 17">메뉴 16</Menu.Item>
        <Menu.Item value="메뉴 18">메뉴 17</Menu.Item>
        <Menu.Item value="메뉴 19">메뉴 18</Menu.Item>
        <Menu.Item value="메뉴 20">
          <Svg type="Logo" width="30" />
        </Menu.Item>
      </Menu.List>
    ),
  },
};
export const NoKeyboardEvent: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
      controlKeys: NO_TRIGGER,
    },
    children: (
      <Menu.List>
        <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
        <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
        <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
        <Menu.Item value="메뉴 4">
          <Svg type="Logo" width="30" />
        </Menu.Item>
      </Menu.List>
    ),
  },
};
export const EscOnly: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
      controlKeys: [TRIGGER_KEYS.ESC],
    },
    children: (
      <Menu.List>
        <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
        <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
        <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
        <Menu.Item value="메뉴 4">
          <Svg type="Logo" width="30" />
        </Menu.Item>
      </Menu.List>
    ),
  },
};
export const CantCloseBackGround: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
      backgroundClose: false,
    },
    children: (
      <Menu.List>
        <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
        <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
        <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
        <Menu.Item value="메뉴 4">
          <Svg type="Logo" width="30" />
        </Menu.Item>
      </Menu.List>
    ),
  },
};
export const RememberItem: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
      rememberItem: true,
    },
    children: (
      <Menu.List>
        <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
        <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
        <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
        <Menu.Item value="메뉴 4">
          <Svg type="Logo" width="30" />
        </Menu.Item>
      </Menu.List>
    ),
  },
};
export const MenuDirection: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
      rememberItem: true,
    },
  },
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "80px",
        }}
      >
        <Menu {...args} context={{ ...args.context, direction: "top" }}>
          <Menu.Button
            style={{
              backgroundColor: "#516fff",
              width: "100px",
              height: "50px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            위
          </Menu.Button>
          <Menu.List>
            <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
            <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
            <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
            <Menu.Item value="메뉴 4">
              <Svg type="Logo" width="30" />
            </Menu.Item>
          </Menu.List>
        </Menu>
        <Menu {...args} context={{ ...args.context, direction: "bottom" }}>
          <Menu.Button
            style={{
              backgroundColor: "#516fff",
              width: "100px",
              height: "50px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            아래
          </Menu.Button>
          <Menu.List>
            <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
            <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
            <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
            <Menu.Item value="메뉴 4">
              <Svg type="Logo" width="30" />
            </Menu.Item>
          </Menu.List>
        </Menu>
        <Menu {...args} context={{ ...args.context, direction: "right" }}>
          <Menu.Button
            style={{
              backgroundColor: "#516fff",
              width: "100px",
              height: "50px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            오른쪽
          </Menu.Button>
          <Menu.List>
            <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
            <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
            <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
            <Menu.Item value="메뉴 4">
              <Svg type="Logo" width="30" />
            </Menu.Item>
          </Menu.List>
        </Menu>
        <Menu {...args} context={{ ...args.context, direction: "left" }}>
          <Menu.Button
            style={{
              backgroundColor: "#516fff",
              width: "100px",
              height: "50px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            왼쪽
          </Menu.Button>
          <Menu.List>
            <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
            <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
            <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
            <Menu.Item value="메뉴 4">
              <Svg type="Logo" width="30" />
            </Menu.Item>
          </Menu.List>
        </Menu>
      </div>
    );
  },
};
export const MenuLeftPosition: Story = {
  args: {
    context: {
      direction: "bottom",
      handleItemSelect: (value: string) => {
        alert(value);
      },
      rememberItem: true,
    },
  },
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "80px",
        }}
      >
        <Menu
          {...args}
          context={{ ...args.context, direction: "top", position: "left" }}
        >
          <Menu.Button
            style={{
              backgroundColor: "#516fff",
              width: "100px",
              height: "50px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            위
          </Menu.Button>
          <Menu.List>
            <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
            <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
            <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
            <Menu.Item value="메뉴 4">
              <Svg type="Logo" width="30" />
            </Menu.Item>
          </Menu.List>
        </Menu>
        <Menu
          {...args}
          context={{ ...args.context, direction: "bottom", position: "left" }}
        >
          <Menu.Button
            style={{
              backgroundColor: "#516fff",
              width: "100px",
              height: "50px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            아래
          </Menu.Button>
          <Menu.List>
            <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
            <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
            <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
            <Menu.Item value="메뉴 4">
              <Svg type="Logo" width="30" />
            </Menu.Item>
          </Menu.List>
        </Menu>
        <Menu
          {...args}
          context={{ ...args.context, direction: "right", position: "left" }}
        >
          <Menu.Button
            style={{
              backgroundColor: "#516fff",
              width: "100px",
              height: "50px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            오른쪽
          </Menu.Button>
          <Menu.List>
            <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
            <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
            <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
            <Menu.Item value="메뉴 4">
              <Svg type="Logo" width="30" />
            </Menu.Item>
          </Menu.List>
        </Menu>
        <Menu
          {...args}
          context={{ ...args.context, direction: "left", position: "left" }}
        >
          <Menu.Button
            style={{
              backgroundColor: "#516fff",
              width: "100px",
              height: "50px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            왼쪽
          </Menu.Button>
          <Menu.List>
            <Menu.Item value="메뉴 1">메뉴 1</Menu.Item>
            <Menu.Item value="메뉴 2">메뉴 2</Menu.Item>
            <Menu.Item value="메뉴 3">메뉴 3</Menu.Item>
            <Menu.Item value="메뉴 4">
              <Svg type="Logo" width="30" />
            </Menu.Item>
          </Menu.List>
        </Menu>
      </div>
    );
  },
};
