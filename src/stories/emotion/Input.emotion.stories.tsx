import Input from '@/components/input/inputEmotion/Input.emotion'
import type { Meta, StoryObj } from '@storybook/react'

/**
 * 공용 인풋 컴포넌트 - emotion.Ver
 * input 태그의 모든 속성 가능
 */
const meta = {
  title: 'Input/emotion',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Input 컴포넌트의 라벨',
    },
    variant: {
      options: ['outlined', 'filled', 'none'],
      control: { type: 'radio' },
      description: 'Input 컴포넌트의 border 형태에 따른 스타일',
    },
    css: {
      control: { type: 'object' },
      description: '사용자 지정 Input 스타일',
    },
  },
  args: {
    label: '이름',
    variant: 'outlined',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const outlinedInput: Story = {
  args: {
    type: 'text',
    placeholder: '아이디를 입력하세요.',
    variant: 'outlined',
    disabled: false,
  },
}

export const filledInput: Story = {
  args: {
    type: 'text',
    placeholder: 'filledInput 타입의 인풋',
    variant: 'filled',
    disabled: false,
  },
}

export const NoLineInput: Story = {
  args: {
    type: 'text',
    placeholder: '아이디를 입력하세요.',
    variant: 'none',
    disabled: false,
  },
}

export const readOnlyInput: Story = {
  args: {
    type: 'text',
    placeholder: 'readOnly 상태입니다.',
    variant: 'outlined',
    readOnly: true,
  },
}

export const disabledInput: Story = {
  args: {
    type: 'text',
    placeholder: 'disabled 상태입니다.',
    variant: 'outlined',
    disabled: true,
  },
}
