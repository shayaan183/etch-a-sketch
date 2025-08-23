let currentMode = "color";
let currentColor = "#000000";

function updateCurrentColor(newColor) {
    currentColor = newColor;
}

function updateCurrentMode(newMode) {
    currentMode = newMode;
    changeActiveButton(newMode);
}

const container = document.querySelector(".container");
const colorBtn = document.querySelector("#color");
const colorPicker = document.querySelector("#color-picker");
const rainbowBtn = document.querySelector("#rainbow");
const shadingBtn = document.querySelector("#shading");
const eraserBtn = document.querySelector("#eraser");
const resizeSlider = document.querySelector("#resize-slider");
const resizeOutput = document.querySelector("#output");

colorBtn.addEventListener('click', () => updateCurrentMode("color"));
colorPicker.addEventListener('input', (e) => updateCurrentColor(e.target.value));
rainbowBtn.addEventListener('click', () => updateCurrentMode("rainbow"));
shadingBtn.addEventListener('click', () => updateCurrentMode("shading"));
eraserBtn.addEventListener('click', () => updateCurrentMode("eraser"));
resizeSlider.addEventListener('change', (e) => resizeGrid(e.target.value));
resizeSlider.addEventListener('input', (e) => resizeOutput.innerHTML = `Size: ${e.target.value} &times; ${e.target.value}`);

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

        square.addEventListener('mouseenter', () => {
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
                    square.style.backgroundColor = "#000000";
                }
            } else if (currentMode == "eraser") {{
                square.style.opacity = 0;
                square.style.backgroundColor = "#ffffff";
            }}
        });

        container.appendChild(square);
    }
}


function resizeGrid(e) {
    let newSize = e;
    newSize = parseInt(newSize);
    createGrid(newSize);
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
    } else if (mode == "eraser") {{
        eraserBtn.classList.add("active-btn");
    }}
}

createGrid(16);
changeActiveButton("color");