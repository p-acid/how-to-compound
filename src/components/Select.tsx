import React, { createContext, ReactNode } from "react";
import { useState } from "react";
import styled from "styled-components";
import useSelect from "../hooks/useSelect";

export const SelectContext = createContext(null);
SelectContext.displayName = "SelectContext";

interface SelectProps {
  children: ReactNode;
}

/**
 * Make Context API Provider : Wrapper component
 */
const Select = ({ children }: SelectProps) => {
  const [open = false, setOpen] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);

  return (
    <SelectContext.Provider
      value={{ open, onOpen: setOpen, selected, onSelect: setSelected }}
    >
      {children}
    </SelectContext.Provider>
  );
};

Select.Trigger = function Trigger({ children }) {
  const { onOpen } = useSelect();

  const toggleList = () => {
    onOpen((prev: boolean) => !prev);
  };

  return <button onClick={toggleList}>{children}</button>;
};

Select.OptionList = function OptionList({ children }) {
  const { open } = useSelect();

  return open && <ul>{children}</ul>;
};

Select.Option = function Option({ children, value }) {
  const { selected, onSelect } = useSelect();

  const selectOption = () => {
    onSelect((prev: any[]) => {
      const isSelected = prev.includes(value);

      if (isSelected) {
        return prev.filter((selectedValue) => selectedValue !== value);
      }

      return [...prev, value];
    });
  };

  return (
    <OptionWrapper aria-selected={selected} onClick={selectOption}>
      {children} {selected.includes(value) ? "selected!" : ""}
    </OptionWrapper>
  );
};

export default Select;

const OptionWrapper = styled.li`
  background: blue;
`;
