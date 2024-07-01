document.addEventListener('DOMContentLoaded', () => {
    const succesMsg = localStorage.getItem('success-message');
    const msg = document.getElementById('confirmation-message');
    const txt = document.getElementById('confirmation-text');

    if (succesMsg) {
        txt.innerText = succesMsg
    }

    msg.classList.remove("hidden");
    msg.classList.add("flex");
  
    setTimeout(() => {
      msg.classList.add("hidden");
      msg.classList.remove("flex");
      localStorage.removeItem("success-message");
    }, 1000);
})