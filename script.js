const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#upperCase");
const lowercaseCheck = document.querySelector("#lowerCase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
// set strength circle colour to grey 

// set password length 

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // shadow 
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

// function to calculate strength 
function calcStrength() {
        let hasUpper = false;
        let hasLower = false;
        let hasNum = false;
        let hasSym = false;
        if (uppercaseCheck.checked) hasUpper = true;
        if (lowercaseCheck.checked) hasLower = true;
        if (numbersCheck.checked) hasNum = true;
        if (symbolsCheck.checked) hasSym = true;
    
        if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
        } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
        ) {
        setIndicator("#ff0");
        } else {
        setIndicator("#f00");
        }
     }

    // function to copy the content to clipboard 
    async function copyContent() {
        try {
          await navigator.clipboard.writeText(passwordDisplay.value);
          copyMsg.innerText = "Copied";
        } catch (err) {
          copyMsg.innerText = "Failed";
        }
        copyMsg.classList.add("active");
        setTimeout(() => {
          copyMsg.classList.remove("active");
        }, 2000);
      }
      
      function handleCheckBoxChange() {
        checkCount = 0;
        allCheckBox.forEach((checkbox) => {
          if(checkbox.checked)
          checkCount++;
        });

        // Special condition 

        if(passwordLength<checkCount){
          passwordLength=checkCount;
          handleSlider();
        }
      }

      allCheckBox.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckBoxChange);
      })

      copyBtn.addEventListener("click", () => {
        if (passwordDisplay.value)
        copyContent();
      });

      inputSlider.addEventListener('input',(e) => {
        passwordLength = e.target.value;
        handleSlider();
      })