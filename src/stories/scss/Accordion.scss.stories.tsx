import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "@/components/accordion/accordionSCSS/Accordion.scss";

const items = [
  {
    value: "item1",
    title: "Accordion 1",
    text: "This is the content of Accordion 1",
  },
  {
    value: "item2",
    title: "Accordion 2",
    text: "This is the content of Accordion 2",
  },
  {
    value: "item3",
    title: "Accordion 3",
    text: "This is the content of Accordion 3",
  },
];

/**
 * 공용 아코디언 컴포넌트 - scss.Ver
 */
const meta = {
  title: "Accordion/scss",
  component: Accordion,
  tags: ["autodocs"],
  render: (args) => {
    return (
      <Accordion {...args}>
        {items.map((item, index) => (
          <Accordion.Item
            key={index}
            value={item.value}
            isDisabled={index === 2}
          >
            <Accordion.Title>{item.title}</Accordion.Title>
            <Accordion.Content>{item.text}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outline", "enclosed", "plain", "subtle"],
      description: "아코디언의 스타일",
    },
    allowMultiple: {
      control: { type: "boolean" },
      description: "여러 아코디언 아이템을 동시에 열 수 있는지 여부",
    },
    defaultValue: {
      control: { type: "text" },
      description:
        "초기 상태에서 열려 있을 아코디언 아이템을 지정. 단일 문자열 또는 문자열 배열을 입력 가능.",
    },
    width: {
      control: { type: "number" },
      description: "아코디언의 너비 설정. 입력 안할시 컨테이너 width",
    },
  },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  args: { width: 200, defaultValue: "item2" },
  render: (args) => {
    return (
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <p style={{ marginBottom: "20px" }}>OutLine (Default)</p>
          <Accordion {...args} variant="outline">
            {items.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.value}
                isDisabled={index === 2}
              >
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.text}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div>
          <p style={{ marginBottom: "20px" }}>Enclosed</p>
          <Accordion {...args} variant="enclosed">
            {items.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.value}
                isDisabled={index === 2}
              >
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.text}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div>
          <p style={{ marginBottom: "20px" }}>Plain</p>
          <Accordion {...args} variant="plain">
            {items.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.value}
                isDisabled={index === 2}
              >
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.text}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div>
          <p style={{ marginBottom: "20px" }}>Subtle</p>
          <Accordion {...args} variant="subtle">
            {items.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.value}
                isDisabled={index === 2}
              >
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.text}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    );
  },
};

export const VariantsWithCustomColor: Story = {
  args: { width: 200, color: "#ffecf1", defaultValue: "item2" },
  render: (args) => {
    return (
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <p style={{ marginBottom: "20px" }}>OutLine (Default)</p>
          <Accordion {...args} variant="outline">
            {items.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.value}
                isDisabled={index === 2}
              >
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.text}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div>
          <p style={{ marginBottom: "20px" }}>Enclosed</p>
          <Accordion {...args} variant="enclosed">
            {items.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.value}
                isDisabled={index === 2}
              >
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.text}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div>
          <p style={{ marginBottom: "20px" }}>Plain</p>
          <Accordion {...args} variant="plain">
            {items.map((item, index) => (
              <Accordion.Item
                key={index}
                value={item.value}
                isDisabled={index === 2}
              >
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.text}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div>
          <p style={{ marginBottom: "20px" }}>Subtle</p>

          <Accordion {...args} variant="subtle">
            {items.map((item, index) => (
              <Accordion.Item key={index} value={item.value}>
                <Accordion.Title>{item.title}</Accordion.Title>
                <Accordion.Content>{item.text}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    );
  },
};

export const MultipleOpen: Story = {
  args: {
    allowMultiple: true,
  },
};

export const defaultOpen: Story = {
  args: {
    allowMultiple: true,
    defaultValue: ["item1", "item2"],
  },
};

export const WithCallback: Story = {
  args: {
    handleAccordionCallback: (value: string) => {
      alert(`open ${value}!!`);
    },
  },
};

export const WithWidth: Story = {
  args: { width: 300 },
};

export const changeIcon: Story = {
  render: (args) => {
    return (
      <Accordion {...args}>
        {items.map((item, index) => (
          <Accordion.Item
            key={index}
            value={item.value}
            isDisabled={index === 2}
          >
            <Accordion.Title icon={<span>❤️</span>}>
              {item.title}
            </Accordion.Title>
            <Accordion.Content>{item.text}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};

export const LongLongContent: Story = {
  render: (args) => {
    return (
      <Accordion {...args}>
        <Accordion.Item value="item1">
          <Accordion.Title>Max Height</Accordion.Title>
          <Accordion.Content maxHeight={300}>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
            <p>This is the content of max Height</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Title>Auto Height</Accordion.Title>
          <Accordion.Content>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
            <p>This is the content of Auto Height</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" isDisabled>
          <Accordion.Title>Accordion 3 (Disabled)</Accordion.Title>
          <Accordion.Content>
            <p>This content should not toggle</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
  },
};

export const Subtext: Story = {
  args: {
    width: 300,
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        {items.map((item, index) => (
          <Accordion.Item key={index} value={item.value}>
            <Accordion.Title>
              <div>
                <p>{item.title}</p>
                <p style={{ marginTop: 10, color: "gray", fontSize: 12 }}>
                  Click to expand
                </p>
              </div>
            </Accordion.Title>
            <Accordion.Content>{item.text}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};
