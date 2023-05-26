import React, { useEffect, useState } from "react";
import { StyleSheet, Text as RNText } from "react-native"; //@ignore-multi-bhasha-transformation
import { useGlobalConsumer } from "../context/GlobalContext";
import { maskNumberWithZero, unmaskNumberFromZero } from "./utils";
/*

  selectedLanguage = undefined
  languageMappingTable = {
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
    }
  }

*/

const getInitialValue = (children, languageMappingTable, selectedLanguage) => {
  let v = children;

  if (
    typeof children === "string" &&
    selectedLanguage !== "en" &&
    languageMappingTable[selectedLanguage][children]
  ) {
    v = languageMappingTable[selectedLanguage][children];
  }
  return v;
};

const MultiBhashaText = ({ children, ...props }) => {
  const { languageMappingTable, selectedLanguage } = useGlobalConsumer();
  const [data, setData] = useState(
    getInitialValue(children, languageMappingTable, selectedLanguage)
  );

  // const getStyles = () => {
  //   let styles = props.style;
  //   if (styles){
  //     styles = StyleSheet.flatten(styles);
  //     if (styles.padding === undefined){
  //       styles.paddingTop = 0
  //     }
  //     if (styles.paddingTop === undefined){
  //       styles.paddingTop = 0
  //     }
  //     styles.paddingTop = styles.paddingTop + 2;
  //   }
  //   return styles
  // }

  const convertTextWithApi = async (txt: string) => {
    let response: any = txt;
    try {
      const key = "****";
      const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${selectedLanguage}`;
      const location = "centralindia";

      var myHeaders = new Headers();
      myHeaders.append("Ocp-Apim-Subscription-Key", key);
      myHeaders.append("Ocp-Apim-Subscription-Region", location);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify([
          {
            text: txt,
          },
        ]),
      };

      response = await fetch(url, requestOptions);
      response = response.json();
    } catch (err) {
      console.log(`-=-=->Error:${err}`);
      response = txt;
    }
    return response;
  };

  const getTranslation = (mapping: any, lang: string, text: string) => {
    const numberCharsArray = [];
    const mText = maskNumberWithZero(text, numberCharsArray);
    if (mapping[lang][mText] === undefined) {
      // make api call to fetch the data
      convertTextWithApi(mText)
        .then((v) => {
          const parsedValue = v[0]["translations"][0]["text"];
          mapping[lang][mText] = parsedValue;
          setData(unmaskNumberFromZero(parsedValue, numberCharsArray));
        })
        .catch((err) => {
          setData(children);
        });
    } else {
      setData(unmaskNumberFromZero(mapping[lang][mText], numberCharsArray));
    }
  };

  useEffect(() => {
    if (selectedLanguage === "en") {
      setData(children);
      return;
    }

    // Other than English language
    if (typeof children === "string") {
      getTranslation(languageMappingTable, selectedLanguage, children);
    }
  }, [children, selectedLanguage]);

  return (
    <RNText
      {...props}
      style={[
        props.style,
        {
          paddingTop: 2,
        },
      ]}
    >
      {data}
    </RNText>
  );
};

export default MultiBhashaText;
