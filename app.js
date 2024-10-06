let selectedColor = "red";
const colorOptions = getColorOptions();

let isLeftClick = false;

function getColorOptions() {
  const array = [];
  document.querySelectorAll(".colorContainer > button").forEach((v) => {
    array.push(v.classList[0]);
    v.addEventListener("click", (e) => {
      selectedColor = e.target.classList[0];
    });
  });
  return array;
}
function showGrid(size = 100) {
  // Remove the previous container if it exists
  const oldContainer = document.querySelector(".container");
  if (oldContainer) {
    oldContainer.remove();
  }

  // Create a new container
  const container = document.createElement("div");
  container.classList.add("container");

  if (!size || size > 100) {
    size = 100;
  }
  const percentage = (1 / size) * 100;
  size = size ** 2;

  for (let i = 0; i < size; i++) {
    const div = document.createElement("div");
    div.classList.add("grid");
    div.style.width = `${percentage}%`;
    container.appendChild(div);
  }

  container.addEventListener("mouseover", mouseoverHandler);
  container.addEventListener("mousedown", (e) => {
    isLeftClick = e.button === 0;
  });
  container.addEventListener("mouseup", () => {
    isLeftClick = false;
  });

  // Append the container to the body
  document.body.append(container);
}
function removeElementBackgroundColor(element) {
  element.classList.remove(...colorOptions);
}
function changeElementBackgroundColor(element) {
  removeElementBackgroundColor(element);
  element.classList.add(`${selectedColor}`);
}
function mouseoverHandler(e) {
  if (isLeftClick) changeElementBackgroundColor(e.target);
}

showGrid(100);
changeGridSize.addEventListener("click", (e) => {
  const divAmount = +prompt("Enter Grid Size: ");
  showGrid(divAmount);
});

toggleGrid.addEventListener("click", (e) => {
  document.querySelectorAll(".grid").forEach((v) => {
    v.classList.toggle("toggleOutLine");
  });
});
