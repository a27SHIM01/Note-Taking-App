// Initialization
const whiteboard = document.querySelector('#whiteboard-canvas');
const whiteboardContext = whiteboard.getContext('2d');

const whiteboardPenSize = document.querySelector('#whiteboard-pen-size');
const whiteboardColourPicker = document.querySelector('#whiteboard-colour-picker');
const whiteboardEraser = document.querySelector('#whiteboard-eraser');
const whiteboardEraserSize = document.querySelector('#whiteboard-eraser-size');

let isDrawing = false;
let lastX = 0, lastY = 0;

setWhiteboardSize();
whiteboardEraser.checked = false;
switchModes();


// Functions
function loadWhiteboard() {
  const savedWhiteboard = localStorage.getItem('whiteboard');
  const img = new Image;
  img.src = savedWhiteboard;
  img.onload = () => {
    whiteboardContext.drawImage(img, 0, 0);
  }
}

function saveWhiteboard() {
  localStorage.setItem('whiteboard', whiteboard.toDataURL());
}

function setEraserSize() {
  whiteboardContext.lineWidth = parseInt(whiteboardEraserSize.value);
}

function switchModes() {
  if (whiteboardEraser.checked) {
    // Switch to eraser mode
    whiteboardContext.globalCompositeOperation = 'destination-out';
    whiteboardContext.strokeStyle = "rgba(255,255,255,1)";
    whiteboardEraserSize.disabled = false;
    whiteboardPenSize.disabled = true;
    setEraserSize();
  }
  else {
    // Switch to pen mode
    whiteboardContext.globalCompositeOperation = 'source-over';
    whiteboardEraserSize.disabled = true;
    whiteboardPenSize.disabled = false;
    setPen();
    setColour();
  }
}

function setColour() {
  whiteboardContext.strokeStyle = whiteboardColourPicker.value;
}

function setPen() {
  whiteboardContext.lineWidth = parseInt(whiteboardPenSize.value);
  whiteboardContext.lineCap = 'round';
}

function setWhiteboardSize() {
  saveWhiteboard();

  // For some reason, when in Eraser mode, resizing will clear the board
  // To get around this, temporarily switch to Pen mode, resize the window, 
  // then revert back
  const isErasing = false;
  if (whiteboardEraser.checked) {
    isErasing = true;
    whiteboardEraser.checked = false;
    switchModes();
  }
  
  whiteboard.width = window.innerWidth * 0.4;
  whiteboard.height = window.innerHeight * 0.7;
  loadWhiteboard();
  
  if (isErasing) {
    whiteboardEraser.checked = true;
    switchModes();
  }
}

function setMousePosition(e) {
  lastX = e.offsetX;
  lastY = e.offsetY;
}

function draw(e) {
  if (isDrawing) {
    whiteboardContext.beginPath();
    whiteboardContext.moveTo(lastX, lastY);
    setMousePosition(e);
    whiteboardContext.lineTo(lastX, lastY);
    whiteboardContext.stroke();
  }
}


// Event Listeners
window.addEventListener('load', loadWhiteboard);
window.addEventListener('resize', setWhiteboardSize);

whiteboard.addEventListener('mousedown', (e) => {
  isDrawing = true;
  setMousePosition(e);
});
whiteboard.addEventListener('mouseup', (e) => {
  isDrawing = false;
});
whiteboard.addEventListener('mousemove', draw);

whiteboardPenSize.addEventListener('change', setPen);
whiteboardColourPicker.addEventListener('change', setColour);
whiteboardEraser.addEventListener('click', switchModes);
whiteboardEraserSize.addEventListener('change', setEraserSize);

