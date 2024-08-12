// Initialization
const minimizeBtn = document.querySelector('.minimize-btn');
const saveBtn = document.querySelector('.save-btn');
const downloadBtn = document.querySelector('.download-btn');

const notepadHeader = document.querySelector('#notepad-header');
const notepadMenu = document.querySelector('#notepad-menu');
const notepadTextarea = document.querySelector('#notepad-textarea');

const h1 = document.querySelector('h1');


// Functions
function minimize() {
  const notepad = document.querySelector('#notepad');
  if (notepadMenu.style.display == 'none') {
    notepadTextarea.style.display = 'block';
    notepadMenu.style.display = 'block';
    minimizeBtn.innerHTML = '_';
    notepad.style.width = '45vw';
    notepad.style.height = '90vh';
    notepadHeader.style.borderRadius = '25px 25px 0px 0px';
    // h1.style.fontSize = '30px';
  }
  else {
    notepadTextarea.style.display = 'none';
    notepadMenu.style.display = 'none';
    minimizeBtn.innerHTML = '+';
    notepad.style.width = '20%';
    notepad.style.height = 'auto';
    notepadHeader.style.borderRadius = '25px';
    // h1.style.fontSize = '4vw';
  }
}

function downloadNotes() {
  const notes = notepadTextarea.value;
  const blob = new Blob([notes], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notes.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function loadNotes() {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notepadTextarea.value = savedNotes;
  }
}

function saveNotes() {
  localStorage.setItem('notes', notepadTextarea.value);
}

// Event Listeners

// notepadHeader.addEventListener('click', minimize);
minimizeBtn.addEventListener('click', minimize);

saveBtn.addEventListener('click', saveNotes);
window.addEventListener('load', loadNotes);
downloadBtn.addEventListener('click', downloadNotes);
