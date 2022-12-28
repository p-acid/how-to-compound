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
      <SelectWrapper>{children}</SelectWrapper>
    </SelectContext.Provider>
  );
};

Select.Trigger = function Trigger({ children }) {
  const { onOpen } = useSelect();

  const toggleList = () => {
    onOpen((prev: boolean) => !prev);
  };

  return <TriggerWrapper onClick={toggleList}>{children}</TriggerWrapper>;
};

Select.OptionList = function OptionList({ children }) {
  const { open } = useSelect();

  return open && <OptionListWrapper>{children}</OptionListWrapper>;
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
      {children}
      <span>{selected.includes(value) ? "✔️" : ""}</span>
    </OptionWrapper>
  );
};

export default Select;

const SelectWrapper = styled.div`
  position: relative;
`;

const TriggerWrapper = styled.button`
  padding: 8px;
`;

const OptionListWrapper = styled.ul`
  position: absolute;
  top: 40px;
  min-width: 150px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
`;

const OptionWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  line-height: 16px;
  list-style: none;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
`;
