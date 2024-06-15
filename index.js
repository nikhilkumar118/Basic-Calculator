// const display = document.getElementById("display");

// function appendToDisplay(input){
//     display.value+=input;
// }

// function calculate(){
//     try{
//         display.value=eval(display.value);
//     }
//     catch(error){
//         display.value="Error";
//     }
// }

// function clear(){
//     let currentOperand = '';
//     updateDisplay();
// }

// function updateDisplay() {
//     display.value = currentOperand;
// }

// Variables to store the display element, current operand, previous operand, and selected operation
let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = null;

// Function to append a number to the current operand
function appendNumber(number) {
    if (currentOperand === 'Error') currentOperand = ''; // Clear error state if necessary
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

// Function to set the operation and prepare for the next operand
function setOperation(op) {
    if (currentOperand === 'Error') currentOperand = ''; // Clear error state if necessary
    if (currentOperand === '') return; // Ignore if there's no current operand
    if (previousOperand !== '') {
        calculateResult(); // Calculate the result if there's already a previous operand
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay(); 
}

// Function to clear the display and reset all operands and operation
function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

// Function to update the display with the current operand
function updateDisplay() {
    display.value = currentOperand;
}

// Function to calculate the result based on the selected operation and operands
function calculateResult() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) {
        currentOperand = 'Error';
        updateDisplay();
        return;
    }
    try {
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) throw new Error("Division by zero"); // Handle division by zero
                result = prev / current;
                break;
            default:
                return;
        }
        currentOperand = result;
        operation = null;
        previousOperand = '';
        updateDisplay();
    } catch (error) {
        currentOperand = 'Error'; // Display error if an exception is caught
        updateDisplay();
    }
}