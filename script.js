let togg = 0;

let currentInput = "";
let previousInput = "";
let operator = null;

const disp = document.getElementById("display");
const btn = document.getElementById("toggle-btn");

const display = document.getElementById("display");

btn.addEventListener("click", () => {
    if(togg % 2 == 0) {
        togg = 1;
        disp.innerHTML = "";
        btn.innerHTML = "ON";
        disp.style.backgroundColor = "rgb(125, 136, 90)";
        disp.style.boxShadow = "none";
        btn.style.backgroundColor = "gray";
        
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay(currentInput);
        console.log("x");
    }
    else {
        togg = 0;
        disp.innerHTML = "0";
        btn.innerHTML = "OFF";
        disp.style.backgroundColor = "rgb(144, 173, 101)";
        disp.style.boxShadow = "inset 1px 5px 5px rgb(117, 143, 79)";
        btn.style.backgroundColor = "red";
        console.log("y");
    }
});

// Function to update the display
function updateDisplay(value) {
    if(value == "" && togg == 0) {
        display.innerHTML = "0";
    }
    else {
        display.innerHTML = value;
    }
}

// Function to handle operator logic
function handleOperator(nextOperator) {
    if (operator && previousInput !== "") {
        currentInput = calculate();
    }
    operator = nextOperator;
    previousInput = currentInput;
    currentInput = "";
}

// Function to handle calculation
function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return currentInput;
    let result = 0;
    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if (current === 0) {
                alert("Cannot divide by zero");
                return "0";
            }
            result = prev / current;
            break;
    }
    return result.toString();
}

// Function to handle key press
function handleKeyPress(value) {
    if (!isNaN(value)) { // If the key is a number
        if (currentInput === "0" || currentInput === "") {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    } else if (value === "C") { // Clear input
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay(currentInput);
    } else if (value === "=") { // Calculate result
        if (operator && previousInput !== "") {
            currentInput = calculate();
            operator = null;
            updateDisplay(currentInput);
        }
    } else { // Handle operator
        handleOperator(value);
    }
}

// Add event listeners to buttons
const buttons = document.querySelectorAll(".key");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleKeyPress(button.value);
    });
});