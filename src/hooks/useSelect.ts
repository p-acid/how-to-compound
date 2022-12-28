import { useContext } from "react";
import { SelectContext } from "../components/Select";

const useSelect = () => {
  const context = useContext(SelectContext);

  if (context === undefined) {
    throw new Error("useSelect must be used within a <Select />");
  }

  return context;
};

export default useSelect;
