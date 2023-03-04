//Select all needed DOM elements
const numberButtons =
  document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll(
  "[data-operator]"
);
const allClearButton = document.querySelector(
  "[data-all-clear]"
);
const deleteButton =
  document.querySelector("[data-delete]");
const decimalButton = document.querySelector(
  "[data-decimal]"
);
const equalsButton =
  document.querySelector("[data-equals]");
const previousOperandDisplay = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandDisplay = document.querySelector(
  "[data-current-operand]"
);

// Create a new calculator object to handle all calculator logic
class Calculator {
  constructor(
    previousOperandDisplay,
    currentOperandDisplay
  ) {
    this.previousOperandDisplay = previousOperandDisplay;
    this.currentOperandDisplay = currentOperandDisplay;
    this.clearAll();
  }

  // Create a method to clear all operands and operator
  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // Create a method to delete a number from the current operand
  delete() {
    this.currentOperand = this.currentOperand
      .toString()
      .slice(0, -1);
  }

  // Create a method to append a number to the current operand
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // Create a method to append decimal point to the current operand
  appendDecimal() {
    if (this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + ".";
  }

  // Create a method to set the operation and store the current operand as the previous operand
  selectOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // Create a method to perform  a calculation based on current operation and operands
  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "*":
        computation = previous * current;
        break;
      case "÷":
        computation = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // Create a method to update the calculator display with current and previous operands and operation
  updateDisplay() {
    this.currentOperandDisplay.innerText =
      this.currentOperand;
    if (this.operation != null) {
      this.previousOperandDisplay.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandDisplay.innerText = "";
    }
  }
}

// Create a new instance of the calculator
const calculator = new Calculator(
  previousOperandDisplay,
  currentOperandDisplay
);

// Add event listeners to the number buttons to append the clicked number to the current operand
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Add event listeners to the operator buttons to set the clicked operator as the current operation
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText);
    calculator.updateDisplay();
  })
});

// Add an event listener to the decimal button
decimalButton.addEventListener("click", () => {
  calculator.appendDecimal();
  calculator.updateDisplay();
});

// Add event listener to the equals button to perform the calculation and update the display
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

// Add event listener to the delete button to delete a number and update the calculator display
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// Add event listener to the all clear button to clear and update the calculator display
allClearButton.addEventListener("click", () => {
  calculator.clearAll();
  calculator.updateDisplay();
});
