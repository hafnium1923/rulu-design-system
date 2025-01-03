import type { Meta, StoryObj } from "@storybook/react";

import PinInput from "@/components/pinInput/pinInputSCSS/PinInput.scss";
import Button from "@/components/button/buttonSCSS/Button.scss";
import Svg from "@/components/common/Svg";

/**
 * 공용 PinInput 컴포넌트 - scss.Ver
 */
const meta: Meta<typeof PinInput> = {
  component: PinInput,
  title: "Common/PinInput/scss",
  tags: ["autodocs"],
  args: {
    length: 4,
    onlyNumber: true,
  },
  render: (args) => <PinInput {...args} />,
  decorators: (Story) => {
    return (
      <>
        <p style={{ color: "gray" }}>아래 문자열을 복사 후 붙여넣으세요!</p>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <p>고마워요</p>
          <Button
            variant="plain"
            onClick={() => navigator.clipboard.writeText("고마워요")}
          >
            <Svg type="Clipboard" size={20} />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <p>CUTE</p>
          <Button
            variant="plain"
            onClick={() => navigator.clipboard.writeText("CUTE")}
          >
            <Svg type="Clipboard" size={20} />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginTop: 4,
            marginBottom: 30,
          }}
        >
          <p>1004</p>
          <Button
            variant="plain"
            onClick={() => navigator.clipboard.writeText("1004")}
          >
            <Svg type="Clipboard" size={20} />
          </Button>
        </div>
        {Story()}
      </>
    );
  },
  argTypes: {
    length: { control: "number", description: "핀 입력의 길이(필수)." },
    mask: {
      control: "boolean",
      description: "입력된 값을 마스킹 처리할지 여부.",
      defaultValue: false,
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
      description: "핀 입력의 크기를 설정.",
      defaultValue: "md",
    },
    isError: {
      control: "boolean",
      description: "에러 상태 여부.",
      defaultValue: false,
    },
    onlyNumber: {
      control: "boolean",
      description: "입력값이 숫자만 가능하도록 제한.",
    },
    autoFocus: {
      control: "boolean",
      description: "컴포넌트가 로드될 때 자동으로 포커스를 받을지 여부.",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "입력 필드를 비활성화할지 여부.",
      defaultValue: false,
    },
    errorText: {
      control: "text",
      description: "에러 상태일 때 표시할 텍스트.",
    },
    defaultValue: {
      control: "text",
      description: "초기값을 설정.",
    },
    placeholder: {
      control: "text",
      description: "입력 필드의 자리 표시 텍스트.",
    },
    borderColor: {
      control: "color",
      description: "입력 필드 테두리 색상.",
    },
    textColor: {
      control: "color",
      description: "입력 필드 텍스트 색상.",
    },
    onValueChange: {
      action: "valueChanged",
      description:
        "입력값이 변경될 때 호출되는 콜백 함수. 변경된 값을 매개변수로 제공.",
    },
    onValueComplete: {
      action: "valueCompleted",
      description:
        "핀 입력이 완성되었을 때 호출되는 콜백 함수. 완성된 값을 매개변수로 제공.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PinInput>;

export const Default: Story = {
  args: {},
};

export const DefaultValue: Story = {
  args: {
    defaultValue: "1234",
  },
};

export const Masked: Story = {
  args: {
    mask: true,
  },
};

export const Size: Story = {
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <PinInput {...args} size="small" />
        <PinInput {...args} size="medium" />
        <PinInput {...args} size="large" />
      </div>
    );
  },
};

export const Error: Story = {
  args: {
    isError: true,
    errorText: "이것은 에러메세지입니다.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "❓",
  },
};

export const StringPinInput: Story = {
  args: {
    onlyNumber: false,
  },
};

export const Autofocus: Story = {
  args: {
    autoFocus: true,
  },
};

export const OnValueChange: Story = {
  render: (args) => {
    return <PinInput {...args} onValueChange={console.log} />;
  },
};

export const OnValueComplete: Story = {
  args: {
    onValueComplete: () => alert("complete!"),
  },
};

export const CustomColor: Story = {
  args: {
    borderColor: "pink",
    textColor: "hotpink",
  },
};
