import { type NO_TRIGGER, TRIGGER_KEYS } from "@/constants/keyboard";
import type { TriggerKey } from "@/types/keyboard";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface MenuContextProps {
  isMenuOpen: boolean;
  selectedValue: string;
  direction: "top" | "bottom" | "left" | "right";
  position: "left" | "right";
  backgroundClose: boolean;
  controlKeys: typeof NO_TRIGGER | TriggerKey[];
  handleMenuOpen: () => void;
  handleSelectedValueChange: (value: string) => void;
}

export const MenuContext = createContext<MenuContextProps>(
  {} as MenuContextProps
);

export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }

  return context;
};

export interface MenuProviderProps {
  context: Pick<MenuContextProps, "direction"> &
    Partial<
      Pick<
        MenuContextProps,
        "direction" | "position" | "backgroundClose" | "controlKeys"
      >
    > & {
      rememberItem?: boolean;
      handleItemSelect: (value: string) => void;
    };
}

export const MenuProvider = ({
  children,
  context,
}: PropsWithChildren<MenuProviderProps>) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const direction = useMemo(() => context.direction, [context.direction]);
  const position = useMemo(
    () => (context.position ? context.position : "right"),
    [context.position]
  );
  const backgroundClose = useMemo(
    () => (context.backgroundClose ? context.backgroundClose : true),
    [context.backgroundClose]
  );
  const controlKeys = useMemo(
    () =>
      context.controlKeys
        ? context.controlKeys
        : [...Object.values(TRIGGER_KEYS)],
    [context.controlKeys]
  );

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSelectedValueChange = (value: string) => {
    context.handleItemSelect(value);

    if (context.rememberItem) setSelectedValue(() => value);
  };

  const value = {
    isMenuOpen,
    selectedValue,
    direction,
    position,
    backgroundClose,
    controlKeys,
    handleMenuOpen,
    handleSelectedValueChange,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
