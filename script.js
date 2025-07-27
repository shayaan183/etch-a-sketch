let currentMode = "color";

const container = document.querySelector(".container");
const resizeBtn = document.querySelector("#resize");
const colorBtn = document.querySelector("#color")
const rainbowBtn = document.querySelector("#rainbow");
const shadingBtn = document.querySelector("#shading");
const eraserBtn = document.querySelector("#eraser");

resizeBtn.addEventListener('click', () => resizeGrid());
colorBtn.addEventListener('click', () => {currentMode = "color"});
rainbowBtn.addEventListener('click', () => {currentMode = "rainbow"});
shadingBtn.addEventListener('click', () => {currentMode = "shading"})
eraserBtn.addEventListener('click', () => {currentMode = "eraser"});

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
                square.style.backgroundColor = "#000000";
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

function resizeGrid() {
    let newSize = prompt("Enter a number to resize the grid (4 - 100)");

    if (newSize == null) {
        return;
    }

    newSize = parseInt(newSize);

    if (newSize < 4 || newSize > 100  || isNaN(newSize)) {
        alert("You can't enter that!");
    } else {
        createGrid(newSize);
    }
}

createGrid(16);