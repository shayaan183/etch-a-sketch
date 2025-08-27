let currentMode = "color";
let currentColor = "#000000";
let currentSize = 16;
let currentDrawMode = "hover";
let isMouseDown = false;

function updateCurrentColor(newColor) {
    currentColor = newColor;
}

function updateCurrentMode(newMode) {
    currentMode = newMode;
    changeActiveButton(newMode);
}

function updateCurrentDrawMode() {
    if (currentDrawMode == "hover") {
        currentDrawMode = "drag";
        toggleBtn.textContent = "Mode: Drag";
    } else if (currentDrawMode == "drag") {
        currentDrawMode = "hover";
        toggleBtn.textContent = "Mode: Hover";
    }
}

const container = document.querySelector(".container");
const colorBtn = document.querySelector("#color");
const colorPicker = document.querySelector("#color-picker");
const rainbowBtn = document.querySelector("#rainbow");
const shadingBtn = document.querySelector("#shading");
const eraserBtn = document.querySelector("#eraser");
const resizeSlider = document.querySelector("#resize-slider");
const resizeOutput = document.querySelector("#output");
const clearBtn = document.querySelector("#clear");
const toggleBtn = document.querySelector("#toggle-mode");

container.addEventListener('mousedown', () => isMouseDown = true);
container.addEventListener('mouseup', () => isMouseDown = false);

colorBtn.addEventListener('click', () => updateCurrentMode("color"));
colorPicker.addEventListener('input', (e) => updateCurrentColor(e.target.value));
rainbowBtn.addEventListener('click', () => updateCurrentMode("rainbow"));
shadingBtn.addEventListener('click', () => updateCurrentMode("shading"));
eraserBtn.addEventListener('click', () => updateCurrentMode("eraser"));
resizeSlider.addEventListener('change', (e) => resizeGrid(e.target.value));
resizeSlider.addEventListener('input', (e) => resizeOutput.innerHTML = `Size: ${e.target.value} &times; ${e.target.value}`);
clearBtn.addEventListener('click', () => clearBoard());
toggleBtn.addEventListener('click', () => updateCurrentDrawMode());

function createGrid(size) {
    console.log(`Grid size: ${size}`)
    container.innerHTML = '';
    const totalSquares = size * size;
    const squareSize = container.clientWidth / size;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.style.opacity = 0;

        square.addEventListener('mouseover', () => {
            if (currentDrawMode == "hover" || currentDrawMode == "drag" && isMouseDown) {
                setPaintMode(square);
            }
        });

        square.addEventListener('mousedown', () => {
            if (currentDrawMode == "drag") {
                setPaintMode(square);
            }
        });

        container.appendChild(square);
    }
}

function setPaintMode(square) {
    if (currentMode == "color") {
        square.style.opacity = 1;
        square.style.backgroundColor = currentColor;
    } else if (currentMode == "rainbow") {
        square.style.opacity = 1;
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (currentMode == "shading") {
        let currentOpacity = parseFloat(square.style.opacity);
        if (currentOpacity < 1) {
            currentOpacity += 0.1;
            square.style.opacity = currentOpacity;
            square.style.backgroundColor = currentColor;
        }
    } else if (currentMode == "eraser") {
        square.style.opacity = 0;
        square.style.backgroundColor = "#ffffff";
    }
}

function resizeGrid(e) {
    currentSize = parseInt(e);
    createGrid(currentSize);
}

function changeActiveButton(mode) {
    colorBtn.classList.remove("active-btn");
    rainbowBtn.classList.remove("active-btn");
    shadingBtn.classList.remove("active-btn");
    eraserBtn.classList.remove("active-btn");

    if (mode == "color") {
        colorBtn.classList.add("active-btn");
    } else if (mode == "rainbow") {
        rainbowBtn.classList.add("active-btn");
    } else if (mode == "shading") {
        shadingBtn.classList.add("active-btn");
    } else if (mode == "eraser") {
        eraserBtn.classList.add("active-btn");
    }
}

function clearBoard() {
    createGrid(currentSize);
}

createGrid(currentSize);
changeActiveButton("color");