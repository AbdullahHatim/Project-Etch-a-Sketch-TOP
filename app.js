const container = document.querySelector(".container");
let isLeftClick = false;

function showGrid(size = 100) {
  const percentage = (1 / size) * 100;
  size = size ** 2;

  for (let i = 0; i < size; i++) {
    const div = document.createElement("div");
    div.classList.toggle("grid");
    div.style["width"] = `${percentage}%`;
    container.appendChild(div);
  }
}

function mouseoverHandler(e) {
  if (isLeftClick) e.target.style["background-color"] = "red";
}

container.addEventListener("mouseover", mouseoverHandler);

container.addEventListener("mousedown", (e) => {
  isLeftClick = e.button === 0;
});

container.addEventListener("mouseup", () => {
  isLeftClick = false;
});

showGrid();
