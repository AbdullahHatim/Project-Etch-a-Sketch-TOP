const SPECIAL_COLORS_COUNT = 3;
const colorOptions = getColorOptions();
let selectedColor = "red";
let isLeftClick = false;

function getColorOptions() {
  const colors = [];
  const colorButtons = document.querySelectorAll(".colorContainer > button");

  // Foreach color button get its color name
  colorButtons.forEach((button) => {
    colors.push(button.classList[0]);
    button.addEventListener("click", (e) => {
      selectedColor = e.target.classList[0];
    });
  });

  return colors;
}

function getNewContainer() {
  const oldContainer = document.querySelector(".container");
  if (oldContainer) {
    oldContainer.remove();
  }

  const container = document.createElement("div");
  container.classList.add("container");

  return container;
}

function setBurnEffect(element) {
  if (element.style.filter) {
    let brightness = +element.style.filter.match(/\d+/)[0];
    brightness -= 10;
    element.style.filter = `brightness(${brightness}%)`;
  } else {
    element.style.filter = `brightness(100%)`;
  }
}

function removeElementBackgroundColor(element) {
  element.classList.remove(...colorOptions);
}
function changeElementBackgroundColor(element) {
  if (selectedColor === "interactionRGB") {
    removeElementBackgroundColor(element);
    let randomIndex = Math.floor(
      Math.random() * (colorOptions.length - SPECIAL_COLORS_COUNT)
    );
    selectedColor = colorOptions[randomIndex];
    element.classList.add(`${selectedColor}`);
    selectedColor = "interactionRGB";
  } else if (selectedColor === "burner") {
    setBurnEffect(element);
  } else if (selectedColor.match("highlighter")) {
    const color = selectedColor.replace("highlighter", "").toLowerCase();
    if (element.style.opacity) {
      let opacity = +element.style.opacity;
      opacity += 0.1;
      element.style.opacity = opacity;
    } else {
      element.style.opacity = 0.1;
    }
    element.classList.add(`${color}`);
  } else {
    removeElementBackgroundColor(element);
    element.classList.add(`${selectedColor}`);
  }
}

function addDrawHandlers(container) {
  container.addEventListener("mouseover", (e) => {
    if (isLeftClick) changeElementBackgroundColor(e.target);
  });
  container.addEventListener("mousedown", (e) => {
    isLeftClick = e.button === 0;
  });
  container.addEventListener("mouseup", () => {
    isLeftClick = false;
  });
}

function showGrid(size = 100) {
  const container = getNewContainer();

  if (!size || size > 100) {
    size = 100;
  }
  const widthPercentage = (1 / size) * 100;
  size = size ** 2;

  for (let i = 0; i < size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid");
    cell.style.width = `${widthPercentage}%`;
    container.appendChild(cell);
  }

  addDrawHandlers(container);
  document.body.append(container);
}

function resetGridCells() {
  showGrid(100);
}

function addToolbarHandlers() {
  // Id Elements are automatically added to global scope on modern browsers
  changeGridSize.addEventListener("click", (e) => {
    const divAmount = +prompt("Enter Grid Size: ");
    showGrid(divAmount);
  });

  toggleGrid.addEventListener("click", (e) => {
    document.querySelectorAll(".grid").forEach((v) => {
      v.classList.toggle("toggleOutLine");
    });
  });

  resetGrid.addEventListener("click", resetGridCells);
}

function initiateSketch() {
  resetGridCells(100);
  addToolbarHandlers();
}

initiateSketch();
