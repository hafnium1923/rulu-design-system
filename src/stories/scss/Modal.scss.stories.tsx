import Button from "@/components/button/buttonSCSS/Button.scss";
import Modal from "@/components/modal/modalSCSS/Modal.scss";
import type { ModalContextProps } from "@/components/modal/modalSCSS/ModalContext.scss";
import { useToggle } from "@/hooks/useToggle";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * 공용 모달 컴포넌트 - scss.Ver
 * 모달, 레이아웃, 헤더, 바디, 푸터를 조합하여 사용
 */
const meta = {
  title: "Modal/scss",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    context: {
      isOpen: { control: { type: "boolean" } },
      onOpen: { control: { type: "function" } },
      onClose: { control: { type: "function" } },
      control: { type: "object" },
      description: `모달 오픈, 닫힘 상태제어 \n\n isOpen: 모달 오픈 여부 \n\n onOpen: 모달 오픈 함수 \n\n onClose: 모달 닫기 함수 \n\n (useToggle 훅 사용 권장)`,
    },
    size: {
      options: ["small", "medium", "large", "full"],
      control: "radio",
      description: "모달 크기",
    },
    position: {
      options: ["top", "center", "bottom"],
      control: "radio",
      description: "모달 세로 위치",
    },
    isScrimCloseable: {
      control: { type: "boolean" },
      description: "배경 클릭시 닫힘 여부",
    },
    isEscCloseable: {
      control: { type: "boolean" },
      description: "ESC로 닫힘 여부",
    },
    hideScrim: {
      control: { type: "boolean" },
      description: "모달 오픈시 백그라운드 유무",
    },
    preventScroll: {
      control: { type: "boolean" },
      description: "모달 오픈시 스크롤 방지 여부",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "medium",
    position: "center",
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    isScrimCloseable: true,
    hideScrim: false,
    preventScroll: true,
    isEscCloseable: true,
  },
  render: (args) => {
    const { isOpen, onOpen, onClose } = useToggle();

    return (
      <div style={{ display: "flex", alignItems: "center", padding: "30 10" }}>
        <Button size="small" onClick={onOpen}>
          {isOpen ? "오픈됨" : "모달 오픈하기"}
        </Button>
        <Modal {...args} context={{ isOpen, onOpen, onClose }}>
          <Modal.Layout>
            <Modal.Header>모달 타이틀</Modal.Header>
            <Modal.Body>모달내용은 여기 적으시면 됩니다.</Modal.Body>
            <Modal.Footer>
              <Modal.Button act="close" variant="primary">
                모달 닫기
              </Modal.Button>
            </Modal.Footer>
          </Modal.Layout>
        </Modal>
      </div>
    );
  },
};

export const VariantsAndPositions: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    isScrimCloseable: true,
    isEscCloseable: true,
    hideScrim: false,
    preventScroll: true,
  },
  render: (args) => {
    return (
      <div>
        <h3>Variants and Positions</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["small", "medium", "large", "full"].map((size) => (
            <div key={size}>
              <div>
                <h4 style={{ marginBottom: "10px" }}>Size: {size}</h4>
                {["top", "center", "bottom"].map((position) => {
                  const { isOpen, onOpen, onClose } = useToggle();

                  return (
                    <div key={position} style={{ marginBottom: "10px" }}>
                      <Button size="small" onClick={onOpen} variant="primary">
                        Position: {position}
                      </Button>
                      <Modal
                        {...args}
                        context={{ isOpen, onOpen, onClose }}
                        size={size as ModalContextProps["size"]}
                        position={position as ModalContextProps["position"]}
                      >
                        <Modal.Layout>
                          <Modal.Header>{`Modal ${size} - ${position}`}</Modal.Header>
                          <Modal.Body>
                            이 모달은 {size} 크기와 {position} 위치를 갖습니다.
                          </Modal.Body>
                          <Modal.Footer>
                            <Modal.Button act="close" variant="primary">
                              모달 닫기
                            </Modal.Button>
                          </Modal.Footer>
                        </Modal.Layout>
                      </Modal>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const NestedModal: Story = {
  args: {
    context: { isOpen: false, onOpen: () => {}, onClose: () => {} },
    isScrimCloseable: false,
    isEscCloseable: true,
    hideScrim: false,
    preventScroll: true,
    position: "top",
    size: "large",
  },
  render: (args) => {
    const { isOpen, onOpen, onClose } = useToggle();
    const {
      isOpen: isFirstChildOpen,
      onOpen: onFirstChildOpen,
      onClose: onFirstChildClose,
      closeGuard: firstChildGuard,
    } = useToggle(true);
    const {
      tryClose: childTryClose,
      handleCancelClose: childHandleCancelClose,
      handleConfirmClose: childHandleConfirmClose,
    } = firstChildGuard;

    return (
      <div style={{ display: "flex", alignItems: "center", padding: "30 10" }}>
        <Button size="small" onClick={onOpen}>
          {isOpen ? "오픈됨" : "모달 오픈하기"}
        </Button>
        <Modal {...args} context={{ isOpen, onOpen, onClose }}>
          <Modal.Layout>
            <Modal.Header>부모 모달</Modal.Header>
            <Modal.Body>모달을 닫겠습니까?</Modal.Body>
            <Modal.Footer>
              <Button size="small" onClick={onFirstChildOpen}>
                예
              </Button>
            </Modal.Footer>
          </Modal.Layout>
        </Modal>
        <Modal
          {...args}
          size="medium"
          position="center"
          context={{
            isOpen: isFirstChildOpen,
            onOpen: onFirstChildOpen,
            onClose: onFirstChildClose,
          }}
        >
          <Modal.Layout>
            <Modal.Header>자식 모달</Modal.Header>
            <Modal.Body>진짜 닫겠습니까?</Modal.Body>
            <Modal.Footer>
              <Button size="small" onClick={childHandleConfirmClose}>
                아니오
              </Button>
              <Button size="small" onClick={onFirstChildClose}>
                예
              </Button>
            </Modal.Footer>
          </Modal.Layout>
        </Modal>
        <Modal
          {...args}
          size="small"
          position="bottom"
          context={{
            isOpen: childTryClose,
            onOpen: onFirstChildClose,
            onClose: childHandleConfirmClose,
          }}
        >
          <Modal.Layout>
            <Modal.Header>손주 모달</Modal.Header>
            <Modal.Body>진짜로요?</Modal.Body>
            <Modal.Footer>
              <Button size="small" onClick={childHandleCancelClose}>
                아니오
              </Button>
              <Button
                size="small"
                onClick={() => {
                  onClose();
                  childHandleConfirmClose();
                }}
              >
                예
              </Button>
            </Modal.Footer>
          </Modal.Layout>
        </Modal>
      </div>
    );
  },
};
