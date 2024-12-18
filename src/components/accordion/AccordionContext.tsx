import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

interface AccordionContextProps {
  openAccordions: string[];
  isOpen: (value: string) => boolean;
  toggleAccordion: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextProps>(
  {} as AccordionContextProps
);

interface AccordionProviderProps {
  defaultValue: string | string[];
  allowMultiple: boolean;
  handleAccordionCallback?: (value: string) => void;
}

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("useAccordionContext must be used within an Accordion");
  }

  return context;
};

export const AccordionProvider = ({
  children,
  defaultValue,
  allowMultiple,
  handleAccordionCallback,
}: PropsWithChildren<AccordionProviderProps>) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>(
    Array.isArray(defaultValue) ? [...defaultValue] : [defaultValue]
  );

  const isOpen = (value: string) => openAccordions.includes(value);

  const toggleAccordion = (value: string) => {
    setOpenAccordions((prev) => {
      const isOpen = prev.includes(value);
      const newValues = isOpen
        ? prev.filter((v) => v !== value)
        : allowMultiple
          ? [...prev, value]
          : [value];
      handleAccordionCallback?.(value);

      return newValues;
    });
  };

  const value = { openAccordions, isOpen, toggleAccordion } as const;

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};
