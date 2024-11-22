import ButtonEmotion from '@/components/Button/Button.emotion'
import ModalEmotion from '@/components/Modal/ModalEmotion/Modal.emotion'
import { useToggle } from '@/hooks/useToggle'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Modal/emotion',
  component: ModalEmotion,
  tags: ['autodocs'],
  argTypes: {
    context: {
      isOpen: { control: { type: 'boolean' } },
      onOpen: { control: { type: 'function' } },
      onClose: { control: { type: 'function' } },
      control: { type: 'object' },
      description: `모달 오픈, 닫힘 상태제어 \n\n isOpen: 모달 오픈 여부 \n\n onOpen: 모달 오픈 함수 \n\n onClose: 모달 닫기 함수 \n\n (useToggle 훅 사용 권장)`,
    },
    isScrimClosable: {
      control: { type: 'boolean' },
      description: '배경 클릭시 닫힘 여부',
    },
    hideScrim: {
      control: { type: 'boolean' },
      description: '모달 오픈시 백그라운드 유무',
    },
    preventScroll: {
      control: { type: 'boolean' },
      description: '모달 오픈시 스크롤 방지 여부',
    },
  },
} satisfies Meta<typeof ModalEmotion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    isScrimClosable: true,
    hideScrim: false,
    preventScroll: true,
  },
  render: (args) => {
    const { isOpen, onOpen, onClose } = useToggle()

    return (
      <div style={{ display: 'flex', alignItems: 'center', padding: '30 10' }}>
        <ButtonEmotion size='small' onClick={onOpen}>
          {isOpen ? '오픈됨' : '모달 오픈하기'}
        </ButtonEmotion>
        <ModalEmotion {...args} context={{ isOpen, onOpen, onClose }}>
          <ModalEmotion.Layout>
            <div
              css={{
                width: '100px',
                height: '100px',
                backgroundColor: 'white',
              }}
            >
              <p>모달 열림</p>
              <ModalEmotion.Button act='close' variant='primary'>
                모달 닫기
              </ModalEmotion.Button>
            </div>
          </ModalEmotion.Layout>
        </ModalEmotion>
      </div>
    )
  },
}
