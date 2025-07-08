const container = document.querySelector(".container");
const resizeBtn = document.querySelector(".resize");

resizeBtn.addEventListener('click', () => resizeGrid());

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

        square.addEventListener('mouseenter', () => {
            square.classList.add("hovered");
        });

        container.appendChild(square);
    }
}

function resizeGrid() {
    let newSize = prompt("Enter a number to resize the grid (4 - 100)");

    if (newSize < 4 || newSize > 100) {
        alert("You can't enter that!")
    } else {
        console.log(newSize);
        newSize = parseInt(newSize);
        createGrid(newSize);
    }
}

createGrid(16);