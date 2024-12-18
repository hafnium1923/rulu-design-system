import type { Meta, StoryObj } from "@storybook/react";
import { Fragment, useState } from "react";

import { useToggle } from "@/hooks";
import Drawer from "@/components/drawer/drawerSCSS/Drawer.scss";
import Button from "@/components/button/buttonSCSS/Button.scss";

/**
 * 공용 Drawer 컴포넌트 - scss.Ver
 */
const meta = {
  title: "Drawer/scss",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    context: {
      isOpen: { control: { type: "boolean" } },
      onOpen: { control: { type: "function" } },
      onClose: { control: { type: "function" } },
      control: { type: "object" },
      description: `드로워 오픈, 닫힘 상태제어 \n\n isOpen: 드로워 오픈 여부 \n\n onOpen: 드로워 오픈 함수 \n\n onClose: 드로워 닫기 함수 \n\n (useToggle 훅 사용 권장)`,
    },
    anchor: {
      options: ["left", "right", "top", "bottom"],
      control: "radio",
      description: "드로워 렌더링 방향",
    },
    variant: {
      options: ["outline", "inline"],
      control: "radio",
      description: "드로워 렌더링되는 영역",
    },
    drawerHandleSize: {
      control: "number",
      description: "드로워 닫혔을 때 얼마나 보일 건지",
    },
    hideScrim: {
      control: "boolean",
      description: "드로워 밖 배경화면 숨길건지 옵션",
    },
    isScrimClosable: {
      control: "boolean",
      description: "드로워 밖 클릭으로 드로워 닫을지 옵션",
    },
    isEscCloseable: {
      control: "boolean",
      description: "esc 로 드로워 닫을지 옵션",
    },
  },

  render: (args) => {
    const { isOpen, onOpen, onClose } = useToggle();

    const handleClick = () => {
      if (isOpen) {
        onClose();
      } else {
        onOpen();
      }
    };

    return (
      <>
        <Button onClick={handleClick} variant="primary">
          Open
        </Button>

        <Drawer {...args} context={{ isOpen, onOpen, onClose }}>
          {drawer}
        </Drawer>
      </>
    );
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const drawer = (
  <li
    style={{
      listStyle: "none",
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    }}
  >
    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
      <ul key={text} style={{ margin: 0, padding: 0 }}>
        <Drawer.Item
          style={{
            display: "flex",
            gap: "20px",
            color: "initial",
            border: 0,
          }}
          handleItemClick={() => {
            alert("click!");
          }}
        >
          {index % 2 === 0 ? (
            <p style={{ width: "10px", fontSize: 20 }}>💗</p>
          ) : (
            <p style={{ width: "10px", fontSize: 20 }}>👻</p>
          )}

          <p style={{ fontSize: 20 }}>{text}</p>
        </Drawer.Item>
      </ul>
    ))}
  </li>
);

export const Default: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
  },
};

export const HideScrim: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
    hideScrim: true,
  },
};

export const CantCloseScrim: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
    hideScrim: true,
    isScrimClosable: false,
  },
};

export const CantCloseEsc: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
    hideScrim: true,
    isEscCloseable: false,
  },
};

export const InlineDrawer: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
    variant: "inline",
  },
};

export const Direction: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
  },
  render: (_) => {
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    return (
      <div style={{ display: "flex", gap: 20 }}>
        {(["left", "right", "top", "bottom"] as const).map((anchor) => {
          const onOpen = () => {
            setState((prev) => {
              return {
                ...prev,
                [anchor]: true,
              };
            });
          };
          const onClose = () => {
            setState((prev) => {
              return {
                ...prev,
                [anchor]: false,
              };
            });
          };
          return (
            <Fragment key={anchor}>
              <Button
                onClick={() => {
                  setState((prev) => {
                    {
                      const curr = prev[anchor];
                      return { ...prev, [anchor]: !curr };
                    }
                  });
                }}
                variant="primary"
              >
                {anchor}
              </Button>
              <Drawer
                anchor={anchor}
                context={{
                  isOpen: state[anchor],
                  onOpen,
                  onClose,
                }}
              >
                <li
                  style={{
                    listStyle: "none",
                    padding: "40px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                  }}
                >
                  {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                      <ul key={text} style={{ margin: 0, padding: 0 }}>
                        <Drawer.Item
                          style={{
                            display: "flex",
                            gap: "20px",
                            color: "initial",
                            border: 0,
                          }}
                          handleItemClick={() => {
                            setState((prev) => {
                              {
                                const curr = prev[anchor];
                                return { ...prev, [anchor]: !curr };
                              }
                            });
                            alert("click!");
                          }}
                        >
                          {index % 2 === 0 ? (
                            <p style={{ width: "10px", fontSize: 20 }}>💗</p>
                          ) : (
                            <p style={{ width: "10px", fontSize: 20 }}>👻</p>
                          )}

                          <p style={{ fontSize: 20 }}>{text}</p>
                        </Drawer.Item>
                      </ul>
                    )
                  )}
                </li>
              </Drawer>
            </Fragment>
          );
        })}
      </div>
    );
  },
};

export const InlineDirection: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
    variant: "inline",
  },
  render: (args) => {
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    return (
      <div style={{ display: "flex", gap: 20 }}>
        {(["left", "right", "top", "bottom"] as const).map((anchor) => {
          const onOpen = () => {
            setState((prev) => {
              return {
                ...prev,
                [anchor]: true,
              };
            });
          };
          const onClose = () => {
            setState((prev) => {
              return {
                ...prev,
                [anchor]: false,
              };
            });
          };
          return (
            <Fragment key={anchor}>
              <Button
                onClick={() => {
                  setState((prev) => {
                    {
                      const curr = prev[anchor];
                      return { ...prev, [anchor]: !curr };
                    }
                  });
                }}
                variant="primary"
              >
                {anchor}
              </Button>
              <Drawer
                {...args}
                anchor={anchor}
                context={{
                  isOpen: state[anchor],
                  onOpen,
                  onClose,
                }}
              >
                <li
                  style={{
                    listStyle: "none",
                    padding: "40px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                  }}
                >
                  {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                      <ul key={text} style={{ margin: 0, padding: 0 }}>
                        <Drawer.Item
                          style={{
                            display: "flex",
                            gap: "20px",
                            color: "initial",
                            border: 0,
                          }}
                          handleItemClick={() => {
                            setState((prev) => {
                              {
                                const curr = prev[anchor];
                                return { ...prev, [anchor]: !curr };
                              }
                            });
                            alert("click!");
                          }}
                        >
                          {index % 2 === 0 ? (
                            <p style={{ width: "10px", fontSize: 20 }}>💗</p>
                          ) : (
                            <p style={{ width: "10px", fontSize: 20 }}>👻</p>
                          )}

                          <p style={{ fontSize: 20 }}>{text}</p>
                        </Drawer.Item>
                      </ul>
                    )
                  )}
                </li>
              </Drawer>
            </Fragment>
          );
        })}
      </div>
    );
  },
};

export const OutlineHandle: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
    drawerHandleSize: 20,
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const InlineHandle: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    anchor: "left",
    drawerHandleSize: 20,
    variant: "inline",
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const AlwaysOpenInline: Story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
  args: {
    anchor: "left",
    variant: "inline",
  },
  render: (args) => {
    const { isOpen, onOpen, onClose } = useToggle(true, true);

    const handleClick = () => {
      if (isOpen) {
        console.log("닫어");
        onClose();
      } else {
        console.log("열어");

        onOpen();
      }
    };
    return (
      <>
        <Button onClick={handleClick} variant="primary">
          Open
        </Button>
        <Drawer {...args}>{drawer}</Drawer>
      </>
    );
  },
};

export const AlwaysOpenOutline: Story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
  args: {
    anchor: "left",
  },
  render: (args) => {
    const { isOpen, onOpen, onClose } = useToggle(true);

    const handleClick = () => {
      if (isOpen) {
        onClose();
      } else {
        onOpen();
      }
    };
    return (
      <>
        <Button onClick={handleClick} variant="primary">
          Open
        </Button>
        <Drawer {...args}>{drawer}</Drawer>
      </>
    );
  },
};
