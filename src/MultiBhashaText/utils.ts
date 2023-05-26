const maskNumberWithZero = (txt: string, numberCharsArray: Array<String>) => {
  // encode the number with *
  let encodeText = ``;
  const arr = txt.split("");

  for (let i = 0; i < arr.length; i++) {
    const charCode = arr[i].charCodeAt(0);
    if (charCode > 47 && charCode < 58) {
      // number
      numberCharsArray.push(arr[i]);
      arr[i] = "0";
    }
  }

  return arr.join("");
};

const unmaskNumberFromZero = (txt: string, numberCharsArray: Array<String>) => {
  // decode the number with *

  const arr = txt.split("");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "0") {
      arr[i] = numberCharsArray.shift();
    }
  }
  return arr.join("");
};

export { maskNumberWithZero, unmaskNumberFromZero };
