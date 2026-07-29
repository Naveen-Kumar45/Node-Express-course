function showMessage(message, type = 'error') {
  const container = document.getElementById('message-container');
  const text = document.getElementById('message-text');
  if (!container || !text) {
    console.warn('Message container not found');
    return;
  }

  container.hidden = false;
  container.classList.remove('message-container--error', 'message-container--success');
  container.classList.add(`message-container--${type}`);
  text.textContent = message;
}

function clearMessage() {
  const container = document.getElementById('message-container');
  const text = document.getElementById('message-text');
  if (!container || !text) {
    return;
  }
  container.hidden = true;
  container.classList.remove('message-container--error', 'message-container--success');
  text.textContent = '';
}
