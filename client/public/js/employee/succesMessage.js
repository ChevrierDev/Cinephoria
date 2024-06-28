document.addEventListener('DOMContentLoaded', () => {

const successMessage = localStorage.getItem('success-message');
const messageContainer = document.getElementById('message');
const text = document.getElementById('text');

if (successMessage) {
  text.innerHTML = successMessage;
  messageContainer.classList.remove('hidden');

  setTimeout(() => {
    messageContainer.classList.add('hidden');
    localStorage.removeItem('success-message');
  }, 3000);
}
})
