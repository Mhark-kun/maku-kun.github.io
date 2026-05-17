// script.js

const display = document.getElementById("display");

// Track if equals button was clicked
let lastCalculated = false;

// =========================
// CREATE HISTORY SECTION
// =========================
const historyContainer = document.createElement("div");
historyContainer.classList.add("history-container");

historyContainer.innerHTML = `
    <h3>History</h3>
    <ul id="historyList"></ul>
`;

document.querySelector(".calculator").appendChild(historyContainer);

const historyList = document.getElementById("historyList");

// =========================
// ADD VALUE
// =========================
function appendValue(value){

    // Clear Error message first
    if(display.value === "Error"){
        display.value = "";
    }

    // Start new calculation after pressing =
    if(lastCalculated && !isNaN(value)){
        display.value = "";
    }

    lastCalculated = false;

    display.value += value;
}

// =========================
// CLEAR DISPLAY
// =========================
function clearDisplay(){
    display.value = "";
}

// =========================
// DELETE LAST CHARACTER
// =========================
function deleteLast(){

    // Prevent deleting Error text
    if(display.value === "Error"){
        display.value = "";
        return;
    }

    display.value = display.value.slice(0, -1);
}

// =========================
// CALCULATE
// =========================
function calculate(){

    try{

        // Prevent empty calculation
        if(display.value.trim() === ""){
            return;
        }

        const expression = display.value;
        const result = eval(expression);

        // Prevent undefined or invalid result
        if(result === undefined || isNaN(result)){
            display.value = "Error";
            return;
        }

        // Add only valid result to history
        const li = document.createElement("li");
        li.textContent = `${expression} = ${result}`;

        // Add newest history on top
        historyList.prepend(li);

        // Show result
        display.value = result;

        // Mark calculation completed
        lastCalculated = true;

    } catch{

        // Show error but DO NOT save to history
        display.value = "Error";
    }
}