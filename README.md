# multi-bhasha

## About
This package can add the support for multi-lingual in the entire react-native mobile app 

## How to use
1. Add this package to your react-native mobile app
2. Add `@swiggy-private/multi-bhasha/plugin/MultiBhashaText.js` into the `plugins` of the babel.config.js
3. Wrap the entire app in `GlobalProvier`
```
import { GlobalProvider } from "@swiggy-private/multi-bhasha/exports";

const App = () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
)
```
4. Use the below to change the language
```
import { useGlobalConsumer, Languages } from "@swiggy-private/multi-bhasha/exports";

// Languages -> Object of languages

//   const { setSelectedLanguage } = useGlobalConsumer();
//   setSelectedLanguage("hi")
```

## More
1. We are using Microsoft Azure cloud service for the translation API
