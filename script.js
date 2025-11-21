const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
const themeSelect = document.getElementById('theme-select');
const clearHistoryBtn = document.getElementById('clear-history');

let lastInput = '';
let expression = '';

// Operators
const operators = ['+', '-', '*', '/', '%'];

// Append input
function appendToDisplay(value) {
    if (operators.includes(value)) {
        if (operators.includes(lastInput)) {
            // Replace last operator
            expression = expression.slice(0, -1);
        }
    }
    if (value === '.' && lastInput === '.') return;
    expression += value;
    display.value = expression;
    lastInput = value;
}

// Clear
function clearDisplay() {
    expression = '';
    display.value = '';
    lastInput = '';
}

// Calculate
function calculateResult() {
    if (!expression) return;
    try {
        let result = Function('"use strict";return (' + expression + ')')();
        display.value = result;
        addHistory(expression + ' = ' + result);
        expression = result.toString();
        lastInput = '';
    } catch {
        display.value = 'Error';
        expression = '';
        lastInput = '';
    }
}

// History
function addHistory(entry) {
    const div = document.createElement('div');
    div.textContent = entry;
    div.addEventListener('click', () => {
        expression = entry.split('=')[0].trim();
        display.value = expression;
        lastInput = expression.slice(-1);
    });
    historyList.prepend(div);
}

// Clear history
clearHistoryBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
});

// Theme selection
themeSelect.addEventListener('change', (e) => {
    document.body.className = e.target.value;
});

// Keyboard input
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key) || operators.includes(key) || ['(', ')'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') calculateResult();
    else if (key === 'Backspace') {
        expression = expression.slice(0, -1);
        display.value = expression;
        lastInput = expression.slice(-1);
    } else if (key === '.') appendToDisplay('.');
});
