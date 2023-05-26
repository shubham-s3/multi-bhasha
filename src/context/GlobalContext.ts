import React, { useContext } from "react";

const defaultValues = {
  selectedLanguage: null,
};

const GlobalContext = React.createContext<any>(defaultValues);

const useGlobalConsumer = () => {
  const values = useContext(GlobalContext);
  return values;
};

export default GlobalContext;
export { useGlobalConsumer };
