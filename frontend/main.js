const socket = io();

const messagesContainer = document.getElementById('chatBox-messages');
const form = document.getElementById('chatBox-form');
const input = document.getElementById('chatBox-form-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
      console.log(input.value);
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
    console.log('event');
  const messageItem = document.createElement('div');
  messageItem.classList.add('message');
  messageItem.textContent = msg;
  messagesContainer.appendChild(messageItem);
  window.scrollTo(0, document.body.scrollHeight);
});