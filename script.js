const container = document.querySelector(".container");

function createGrid(size) {
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

createGrid(16);