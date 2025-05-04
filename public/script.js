const socket = io();
const editor = document.getElementById('editor');

// Load initial content
socket.on('loadContent', content => {
  editor.value = content;
});

// Update editor when other users type
socket.on('textUpdate', content => {
  editor.value = content;
});

// Send updates when local user types
editor.addEventListener('input', () => {
  socket.emit('textUpdate', editor.value);
});