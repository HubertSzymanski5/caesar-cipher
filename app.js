const charCodeOf = (char) => {
   if (char.length !== 1) {
      console.warn(`Ignoring all but first letter from ${char}`);
   }
   return char.charCodeAt(0);
}

const generateTransformTable = (shift) => {
   const map = {};
   for (let i = 0; i < 26; i++) {
      map[String.fromCharCode(i + charCodeOf("A"))] = String.fromCharCode((i + shift)%26 + charCodeOf("A"));
      map[String.fromCharCode(i + charCodeOf("a"))] = String.fromCharCode((i + shift)%26 + charCodeOf("a"));
   }
   return map;
}

function transformWith(input, charMap) {
   const ignoredChars = [" ", "\n"]
   let output = "";
   for (let i = 0; i < input.length; i++) {
      const char = input.charAt(i);
      if (ignoredChars.includes(char)) {
         output += char;
         continue;
      }
      output += charMap[char];
   }
   return output;
}

const encrypt = (input, shift) => {
   const charMap = generateTransformTable(shift);
   return transformWith(input, charMap);
};

const decrypt = (input, shift) => {
   const invertedShift = 26 - shift%26;
   const charMap = generateTransformTable(invertedShift);
   return transformWith(input, charMap);
}

const isValidShift = (shift) => {
   return shift >= 0;
}

const isValidInput = (inputText) => {
   const inputRegexp = new RegExp("^[A-Za-z \\n]*$");
   console.log(inputRegexp.test(inputText));
   return inputRegexp.test(inputText);
}

const addEventsOnButtons = () => {
   let decryptMode = false;
   const modeSwitch = document.querySelector(".mode-switch");
   modeSwitch.addEventListener("click", () => {
      decryptMode = !decryptMode;
      modeSwitch.classList.toggle("decrypt");
   });

   const inputElement = document.querySelector("textarea[id='input']");
   const shiftInputElement = document.querySelector("input[id='shift']");
   const outputElement = document.querySelector("textarea[id='output']");
   document.querySelector("input[type='button']").addEventListener("click", () => {
      const inputText = inputElement.value;
      const shiftValue = parseInt(shiftInputElement.value);
      if (isValidInput(inputText) && isValidShift(shiftValue)) {
         outputElement.classList.remove("error");
         outputElement.value = decryptMode ? decrypt(inputText, shiftValue) : encrypt(inputText, shiftValue);
      } else {
         outputElement.classList.add("error");
         outputElement.value = "Invalid values! Shift cannot be negative and input must contain only latin chars or spaces";
      }
   });
}

addEventsOnButtons();

