import React from "react";
import styled from "styled-components";
import Select from "./components/Select";

const App = () => {
  return (
    <Main>
      <Select>
        <Select.Trigger>Trigger</Select.Trigger>
        <Select.OptionList>
          <Select.Option value="value1">Value 1</Select.Option>
          <Select.Option value="value2">Value 2</Select.Option>
          <Select.Option value="value3">Value 3</Select.Option>
        </Select.OptionList>
      </Select>
    </Main>
  );
};

export default App;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #a2cba1;
`;
