import type { Meta, StoryObj } from "@storybook/react";

import PinInput from "@/components/pinInput/pinInputSCSS/PinInput.scss";

/**
 * 공용 PinInput 컴포넌트 - scss.Ver
 */
const meta: Meta<typeof PinInput> = {
  component: PinInput,
  title: "PinInput/scss",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    length: 4,
  },
  render: (args) => <PinInput {...args} />,
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
        <PinInput {...args} size="sm" />
        <PinInput {...args} size="md" />
        <PinInput {...args} size="lg" />
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
