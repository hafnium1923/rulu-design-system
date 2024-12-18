import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

export interface DrawerContextProps {
  isOpen: boolean;
  isClosing: boolean;
  onOpen: () => void;
  onClose: () => void;
  onClosing: (state: boolean) => void;
}

export const DrawerContext = createContext<DrawerContextProps>(
  {} as DrawerContextProps
);

export interface DrawerProviderProps {
  context?: Pick<DrawerContextProps, "isOpen" | "onOpen" | "onClose">;
}

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }

  return context;
};

export const DrawerProvider = ({
  context,
  children,
}: PropsWithChildren<DrawerProviderProps>) => {
  const [isOpen, setIsOpen] = useState(context ? context.isOpen : true);
  const [isClosing, setIsClosing] = useState(false);

  const onClosing = (state: boolean) => {
    if (!context) return;

    setIsClosing(state);
  };

  const onOpen = () => {
    if (!context) return;

    setIsOpen(true);
    context.onOpen();
  };

  const onClose = () => {
    if (!context) return;

    setIsOpen(false);
    context?.onClose();
  };

  useEffect(() => {
    if (!context) return;

    if (isOpen && !context?.isOpen) {
      setIsClosing(true);
    } else if (context?.isOpen) {
      setIsOpen(true);
    }
  }, [context?.isOpen]);

  const value = { isClosing, isOpen, onOpen, onClose, onClosing } as const;

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};
