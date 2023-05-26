import React, { useLayoutEffect, useState, useRef } from "react";
import GlobalContext from "./GlobalContext";
import Languages from "../lang.json";

/*

  global.selectedLang = undefined
  global.langMappingTable = {
    hi: {
      abc: abc,
      def: def
    },
    pa: {
      abc: abc,
      def: def
    },
    mr: {
      abc: abc,
      def: def
    },
    kn: {
      abc: abc,
      def: def
    }
    ur: {
      abc: abc,
      def: def
    }
  }

*/

const initMappingTable = () => {
  // Initialise language mapping table
  const mappingTable = {};
  Object.keys(Languages).forEach((name) => {
    mappingTable[Languages[name]] = {};
  });
  return mappingTable;
};

const GlobalProvider = ({ children }: any) => {
  const languageMappingRef = useRef<any>(initMappingTable());
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    Languages.English
  );

  return (
    <GlobalContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        languageMappingTable: languageMappingRef.current,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.defaultProps = {};

export default GlobalProvider;
